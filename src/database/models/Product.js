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
      allowNull: true,
    },
    price:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
    },
    market: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    tableName: "products",
    timestamps: true,
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
      through: "features",
      foreignKey: "product_id",
      otherKey: "color_id"
    });
    Product.belongsToMany(models.Size, {
      as: "sizes",
      through: "features",
      foreignKey: "product_id",
      otherKey: "size_id"
    })
    Product.hasMany(models.OrderItem, {
      as: "order_items",
      foreignKey: "product_id",
    })
  }
  return Product;
};
