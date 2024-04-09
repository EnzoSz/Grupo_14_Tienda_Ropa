//requerimos nuestras variables de entorno
require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "migrationStorage": "sequelize",
    "migrationStorageTableName": "migrations"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "database": "db_homies",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  
}
