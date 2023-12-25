import jwt from "jsonwebtoken";
const { verify } = jwt;

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and add id to req object
  const token = req.header("authToken");
  if (!token) {
    res
      .status(401)
      .send({ error: "please authenticate using the valid token" });
  }
  try {
    const data = verify(token, process.env.JWT_SECRET);

    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "please authenticate using the valid token" });
  }
};

export default fetchuser;
