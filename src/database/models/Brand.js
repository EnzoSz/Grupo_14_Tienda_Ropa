
module.exports = (sequelize, DataTypes) => {
  let alias = "Brand";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }
  let config = {
    tableName: "brands",
    timestamps: true,
    paranoid: true
  }
  const Brand = sequelize.define(alias, cols, config);
  Brand.associate = (models) => {
    Brand.hasMany(models.Product, {
      as: "products",
      foreignKey: "brand_id",
    });
  }
  return Brand;
};