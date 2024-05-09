module.exports = (sequelize, DataTypes) => {
  let alias = "Size";
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
    tableName: "sizes",
    timestamps: false,
    paranoid: true
  }
  const Size = sequelize.define(alias, cols, config);
  Size.associate = (models) => {
    Size.belongsToMany(models.Product, {
      as: "products",
      through: "features",
      foreignKey: "size_id",
      otherKey: "product_id"
    })
  }
  return Size;
};