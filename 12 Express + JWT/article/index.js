const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const articles = [];

app.get("/api/1.0/articles", (_req, res) => {
  res.send(articles);
});

app.post("/api/1.0/articles", async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.substring(7);
  try {
    const result = jwt.verify(token, "This-is-our-secret");
    const article = {
      ...req.body,
      userId: result.id,
    };
    articles.push(article);
    res.send({message: "Success"});
  } catch (err) {
    res.status(403).send({message: "Invalid token"});
  }
});

app.listen(3001, () => {
  console.log("The article service is running on port 3001");
});
