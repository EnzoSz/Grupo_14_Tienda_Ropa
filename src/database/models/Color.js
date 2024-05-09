module.exports = (sequelize, DataTypes) => {
  let alias = "Color";
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
    tableName: "colors",
    timestamps: true,
    paranoid: true
  }
  const Color = sequelize.define(alias, cols, config);
  Color.associate = (models) => {
    Color.belongsToMany(models.Product, {
      as: "products",
      through: "features",
      foreignKey: "color_id",
      otherKey: "product_id"
    })
  }
  return Color;
};