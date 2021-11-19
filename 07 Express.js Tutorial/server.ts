//- To run: ts-node -T server.ts

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");

//- Moved to: /routes/users.js
// app.get("/", (_req, res) => {
//   res.render("index", {text: "Welcome..."});
// });
// app.get("/users", (_req, res) => {
//   res.render("index", {text: "Users"});
// });

const userRouter = require("./routes/users");

app.use("/users", userRouter);

console.log("server is running...");
app.listen(3000);
