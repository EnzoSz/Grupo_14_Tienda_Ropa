"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "features",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        quantity: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        size_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "sizes",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        color_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "colors",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        engine: "InnoDB",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("features");
  },
};
