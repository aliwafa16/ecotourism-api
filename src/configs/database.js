require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const { Sequelize } = require("sequelize");
const log = require("./logger");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  timezone:'+07:00'
});

sequelize
  .authenticate()
  .then()
  .catch((err) => {
    log.debug(`Koneksi kedatabase Gagal: ${err}`);
  });

module.exports = sequelize;
