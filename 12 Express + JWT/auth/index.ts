import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const users: User[] = [];
for (let i = 1; i <= 5; i++) {
  const user = {
    id: i,
    username: `user${i}`,
    email: `user${i}@mail.com`,
    password: "P4ssword",
  };
  users.push(user);
}

app.post("/api/1.0/auth", (req, res) => {
  const credentials = req.body;
  const user = users.find((user) => user.email === credentials.email);
  if (!user) {
    return res.status(401).send({message: "User Unauthorized"});
  }
  if (user.password !== credentials.password) {
    return res.status(401).send({message: "User Unauthorized"});
  }
  const token = jwt.sign({id: user.id}, "This-is-our-secret");
  res.send({
    token: token,
  });
});

app.listen(3000, () => {
  console.log("The auth server is running on port 3000");
});
