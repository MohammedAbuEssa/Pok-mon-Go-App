"use strict";

require("dotenv").config();

const { start } = require("./src/server");
const { sequelize } = require("./src/model/index");
const port = process.env.PORT || 8080;
const db = sequelize;

db.sync({ force: false, alter: true }).then(() => {
  start(port);
});
