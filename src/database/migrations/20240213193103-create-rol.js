"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "rols",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(50),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        deletedAt: {
          allowNull: true,
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
    await queryInterface.dropTable("rols");
  },
};
