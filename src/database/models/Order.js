module.exports = (sequelize, DataTypes) => {
  let alias = "Order";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "card", "paypal", "stripe"),
      allowNull: false,
    },
    shipping_method: {
      type: DataTypes.ENUM("standard", "express", "overnight"),
      allowNull: false,
    }
  };
  let config = {
    tableName: "orders",
    timestamps: true,
    paranoid: true,
  }

  const Order = sequelize.define(alias, cols, config);

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
    Order.hasMany(models.OrderItem, {
      as: "order_item",
      foreignKey: "order_id",
    })
  }
  return Order;
};
