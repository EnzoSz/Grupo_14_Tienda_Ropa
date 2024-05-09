module.exports = (sequelize, DataTypes) => {
  let alias = "Feature";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    tableName: "features",
    timestamps: true,
    paranoid: true,
  };
  const Feature = sequelize.define(alias, cols, config);
  return Feature;
};
