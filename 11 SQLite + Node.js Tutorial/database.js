const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  // host: ":memory", //- For testing purposes
  host: "./dev.sqlite",
});

module.exports = sequelize;
