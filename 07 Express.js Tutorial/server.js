var express = require("express");
var app = express();
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
var userRouter = require("./routes/users");
app.use("/users", userRouter);
console.log("server is running...");
app.listen(3000);
