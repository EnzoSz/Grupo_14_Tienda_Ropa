"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "orders",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        total: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
          ),
          allowNull: false,
          defaultValue: "pending",
        },
        payment_method: {
          type: Sequelize.ENUM("cash", "card", "paypal", "stripe"),
          allowNull: false,
          defaultValue: "cash",
        },
        shipping_method: {
          type: Sequelize.ENUM("standard", "express", "overnight"),
          allowNull: false,
          defaultValue: "standard",
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
          type: Sequelize.DATE,
          allowNull: true,
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
    await queryInterface.dropTable("orders");
  },
};
