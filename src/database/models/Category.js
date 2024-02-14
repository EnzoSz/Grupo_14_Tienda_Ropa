module.exports = (sequelize, DataTypes) => {
  let alias = "Category";
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
    tableName: "categories",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
  const Category = sequelize.define(alias, cols, config);
  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      as: "products",
      foreignKey: "category_id",
    });
  }
  return Category;
};