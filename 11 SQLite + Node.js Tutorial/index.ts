const express = require("express");
const sequelize = require("./database");

const User = require("./User");

sequelize.sync({force: true}).then(() => console.log("DB is ready"));

const app = express();

// Middleware
app.use(express.json());

interface User {
  body: {
    id: number;
    username: string;
    email: string;
    password: string;
  };
}

interface Response {
  send: (arg0: string) => void;
}

app.post("/users", async (req: User, res: Response) => {
  await User.create(req.body);
  res.send("User is inserted");
});

app.get("/users", async (_req: null, res: Response) => {
  const users = await User.findAll();
  res.send(users);
});

app.get("/users/:id", async (req: any, res: Response) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  res.send(user);
});

app.put("/users/:id", async (req: {params: {id: number}; body: {username: string}}, res: Response) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  user.username = req.body.username;
  await user.save();
  res.send("User is updated");
});

app.delete("/users/:id", async (req: {params: {id: number}}, res: Response) => {
  const id = req.params.id;
  await User.destroy({where: {id: id}});
  res.send("User is removed");
});

const port = 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
