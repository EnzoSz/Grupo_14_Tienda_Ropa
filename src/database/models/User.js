const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_profile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  };
  let config = {
    tableName: "users",
    timestamps: false
  }
  const User = sequelize.define(alias, cols, config);
  User.associate = (models) => {
    User.belongsTo(models.Rol, {
      as: "rols",
      foreignKey: "rol_id",
    });
  }
  return User;
};