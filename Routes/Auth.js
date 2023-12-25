import { Router } from "express";
import User from "../models/User.js";
import { validationResult, body } from "express-validator";
import { genSaltSync, hashSync, compare } from "bcrypt";
import fetchuser from "../middleware/fetchuser.js";
import jwt from "jsonwebtoken"; // Use a different name, e.g., 'jwt', to avoid conflicts
const { sign } = jwt;
import dotenv from "dotenv";
const router = Router();
dotenv.config();
const validatePassword = [
  body("email", "enter a valid email").trim().isEmail(),
  body("name", "enter a valid name").trim().isLength({ min: 3 }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("password")
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must have at least one number, one uppercase letter, and one special character"
    ),
];
// Route -2 signIn a user using : POST "/api/auth/signin"

router.post("/signup", validatePassword, async (req, res) => {
  let success = false;
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check if a user with the given name or email already exists
    let user = await User.findOne({ $or: [{ email }] });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this  email already exists" });
    }
    const salt = genSaltSync(10);
    const securePassword = await hashSync(password, salt);
    user = await User.create({
      name: name,
      password: securePassword,
      email: email,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    console.log(user);
    success = true;
    const access_token = sign(data, process.env.JWT_SECRET);
    res.json({ success, access_token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

//Route -2  login a user using : POST "/api/auth/login"

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage(
        "Password must have at least one number, one uppercase letter, and one special character"
      ),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "please try to login with correct credientials",
        });
      }
      const passwordCompare = await compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "please try to login with correct credientials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const access_token = sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, access_token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
//Route -3  logged in detail of a user using : POST "/api/auth/getuser" login required
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
