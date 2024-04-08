//requerimos nuestras variables de entorno
require('dotenv').config();
module.exports = {
  "development": {
    "username": "homies",
    "password": "homies2024",
    "database": "db_homies",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "migrationStorage": "sequelize",
    "migrationStorageTableName": "migrations"
  },
  "test": {
    "username": "homies",
    "password": "homies2024",
    "database": "db_homies",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "homies",
    "password": "homies2024",
    "database": "db_homies",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  
}
