const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nick_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true  
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
      allowNull: true,
      validate: {
        is: /^[0-8a-f]{64}$/i,
      } 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_profile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /////////si es 0 es user normal si es 1 es administrador
    rol_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
    },
  };
  let config = {
    tableName: "users",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
    timestamps: false,
    paranoid: true,
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