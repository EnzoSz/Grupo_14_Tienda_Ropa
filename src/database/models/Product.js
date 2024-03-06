module.exports = (sequelize, DataTypes) => {
  let alias = "Product";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    brand_id: {
      type: DataTypes.INTEGER,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    /* created_at: DataTypes.TIMESTAMP,
    updated_at: DataTypes.TIMESTAMP */
  };
  let config = {
    tableName: "products",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    timestamps: false,
    paranoid: true,
  }
  const Product = sequelize.define(alias, cols, config);
  Product.associate = (models) => {
    Product.belongsTo(models.Brand, {
      as: "brand",
      foreignKey: "brand_id",
    });
    Product.belongsTo(models.Category, {
      as: "category",
      foreignKey: "category_id",
    });
    Product.hasMany(models.Image, {
      as: "images",
      foreignKey: "product_id",
    });
    Product.belongsToMany(models.Color, {
      as: "colors",
      through: "product_color",
      foreignKey: "product_id",
      otherKey: "color_id"
    });
    Product.belongsToMany(models.Size, {
      as: "sizes",
      through: "product_size",
      foreignKey: "product_id",
      otherKey: "size_id"
    })
  }
  return Product;
};
