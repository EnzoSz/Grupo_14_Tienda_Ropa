module.exports = (sequelize, DataTypes) => {
  let alias = "Product_color";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
  let config = {
    tableName: "product_colors",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
  const Product_color = sequelize.define(alias, cols, config);
  return Product_color;
};