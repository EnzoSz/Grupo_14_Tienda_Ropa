module.exports = (sequelize, DataTypes) => {
  let alias = "Image";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
  let config = {
    tableName: "images",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
  const Image = sequelize.define(alias, cols, config);
  Image.associate = (models) => {
    Image.belongsTo(models.Product, {
      as: "product",
      foreignKey: "product_id"
    })
  }
  return Image;
};