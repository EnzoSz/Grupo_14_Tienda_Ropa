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
      type: Sequelize.DATE,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image_profile: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rol_id: {
      type: Sequelize.INTEGER,
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