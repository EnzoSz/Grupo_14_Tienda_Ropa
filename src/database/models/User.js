module.exports = (sequelize, DataType) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    last_name: {
      type: DataType.STRING,
      allowNull: false
    },
    first_name: {
      type: DataType.STRING,
      allowNull: false
    },
    phone: {
      type: DataType.INTEGER,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true
    },
    birth_date: {
      type: DataType.DATE,
      allowNull: false,
    },
    address: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    image_profile: {
      type: DataType.STRING,
      allowNull: false,
    },
    rol_id: {
      type: DataType.INTEGER,
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