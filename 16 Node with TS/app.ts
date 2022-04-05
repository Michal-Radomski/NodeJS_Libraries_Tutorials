import express from "express";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send("Hello World! from Node.js nad Nodemon");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port} from Node.js and Node.js nad Nodemon`);
});
