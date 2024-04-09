//requerimos nuestras variables de entorno
require('dotenv').config();
module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "db_homies",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "migrationStorage": "sequelize",
    "migrationStorageTableName": "migrations"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "db_homies",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "db_homies",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  
}
