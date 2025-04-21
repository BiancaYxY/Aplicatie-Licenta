const { Sequelize } = require("sequelize");
require("dotenv").config();

let db;

if (process.env.RUN_MODE === "LOCAL") {
  db = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
    logging: false, 
  });
} else {
  console.warn(" RUN_MODE not set to LOCAL. No DB config for PROD yet.");
}

module.exports = db;