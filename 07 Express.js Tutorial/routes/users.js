var express = require("express");
var router = express.Router();
router.use(logger);
router.get("/", function (req, res) {
  console.log("req.query.name:", req.query.name);
  res.send("User List");
});
router.get("/new", function (_req, res) {
  res.render("users/new");
});
router.post("/", function (req, res) {
  var isValid = false;
  if (isValid) {
    users.push({firstName: req.body.firstName});
    res.redirect("/users/".concat(users.length - 1));
  } else {
    console.log("Error");
    res.render("users/new", {firstName: req.body.firstName});
  }
});
router
  .route("/:id")
  .get(function (req, res) {
    console.log("req.user:", req.user);
    res.send("Get User With ID ".concat(req.params.id));
  })
  .put(function (req, res) {
    res.send("Update User With ID ".concat(req.params.id));
  })
  ["delete"](function (req, res) {
    res.send("Delete User With ID ".concat(req.params.id));
  });
var users = [{name: "Kyle"}, {name: "Sally"}];
router.param("id", function (req, _res, next, id) {
  console.log("id:", id);
  req.user = users[id];
  next();
});
function logger(req, _res, next) {
  console.log("req.originalUrl:", req.originalUrl);
  next();
}
module.exports = router;
