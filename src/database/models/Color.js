'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  let alias = "Color";
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
  let config = {
    tableName: "colors",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    timestamps: false,
    paranoid: true
  }
  const Color = sequelize.define(alias, cols, config);
  Color.associate = (models) => {
    Color.belongsToMany(models.Product, {
      as: "products",
      through: "product_color",
      foreignKey: "color_id",
      otherKey: "product_id"
    })
  }
  return Color;
};