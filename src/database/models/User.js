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
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true  
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image_profile: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: true  
    },
  };
  let config = {
    tableName: "users",
    timestamps: true,
    paranoid: true,

  }
  const User = sequelize.define(alias, cols, config);
  User.associate = (models) => {
    User.belongsTo(models.Rol, {
      as: "rols",
      foreignKey: "rol_id",
    });
    User.hasMany(models.Order, {
      as: "orders",
      foreignKey: "user_id"
    })
  }
  return User;
};