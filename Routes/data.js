import { Router } from "express";
const dataRouter = Router();

dataRouter.get("/jobRolesData/:jobRole", (req, res) => {
  const data = {
    Frontend: [
      {
        name: "Coding: Intermediate-level algorithms",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "Coding: Data Structures - Arrays",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "javascript",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "React js",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "JQuery",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "Computer Vision",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "Microsoft Access",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "AI Product Manager",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
    ],
    Backend: [
      {
        name: "Gatsby.js",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "PowerShell",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "Object oriented programming",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "Embedded Systems",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "Node Js",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "Phyton",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "django",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
      {
        name: "firebase",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde quas, commodi doloremque reprehenderit aperiam velit?Lorem ipsum dolor sit amet.",
      },
    ],
  };
  try {
    const dataType = req.params.jobRole;
    if (data[dataType]) {
      res.json(data[dataType]);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

export default dataRouter;
