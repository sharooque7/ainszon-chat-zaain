const { Sequelize } = require("sequelize");
const sequelizeConfig = require("./config");

const environment = process.env.NODE_ENV || "development";
const config = sequelizeConfig[environment];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,

  {
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
    sync: {
      force: false, // Do not drop and recreate tables if they already exist
      alter: true, // Do not automatically alter tables to match the model definitions
      logging: false,
    },
  }
);

module.exports = sequelize;
