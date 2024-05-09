module.exports = (sequelize, DataTypes) => {
  let alias = "OrderItem";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  };
  let config = {
    tableName: "order_item",
    timestamps: true,
    paranoid: true,
  };

  const OrderItem = sequelize.define(alias, cols, config);
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      as: "order",
      foreignKey: "order_id",
    });
    OrderItem.belongsTo(models.Product, {
      as: "product",
      foreignKey: "product_id",
    });
  };
  return OrderItem;
};
