'use strict';
const {Sequelize, DataTypes, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let alias = "Rol";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }
  let  config = {
      tableName: "rols",
      timestamps: true,
      paranoid: true
    }
 const Rol = sequelize.define(alias, cols, config);
  Rol.associate = (models) => {
    Rol.hasMany(models.User, {
      as: "users",
      foreignKey: "rol_id",
    });
  }
  return Rol;
};