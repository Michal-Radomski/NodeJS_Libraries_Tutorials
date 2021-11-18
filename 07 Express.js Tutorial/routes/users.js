const express = require("express");
const router = express.Router();

// console.log("router:", router);

router.use(logger);

router.get("/", (req, res) => {
  console.log("req.query.name:", req.query.name);
  res.send("User List");
});

router.get("/new", (_req, res) => {
  res.render("users/new");
});

router.post("/", (req, res) => {
  const isValid = false;
  if (isValid) {
    users.push({firstName: req.body.firstName});
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render("users/new", {firstName: req.body.firstName});
  }
});

router
  .route("/:id")
  .get((req, res) => {
    console.log("req.user:", req.user);
    res.send(`Get User With ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`);
  });

const users = [{name: "Kyle"}, {name: "Sally"}];
router.param("id", (req, _res, next, id) => {
  console.log("id:", id);
  req.user = users[id];
  next();
});

function logger(req, _res, next) {
  console.log("req.originalUrl:", req.originalUrl);
  next();
}

module.exports = router;
