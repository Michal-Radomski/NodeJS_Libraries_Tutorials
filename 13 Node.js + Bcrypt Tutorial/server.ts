import express from "express";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

interface User {
  name: string;
  password: string;
}

const users: User[] = [];

app.get("/users", (_req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    // console.log("salt:", salt);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log("hashedPassword:", hashedPassword);
    const user = {name: req.body.name, password: hashedPassword};
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("User not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

console.log("Server is running on port: 3000");
app.listen(3000);
