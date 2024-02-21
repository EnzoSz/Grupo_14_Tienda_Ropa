"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        first_name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        phone: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        birth_date: {
          type: Sequelize.DATE,
          allowNull: false
        },
        address: {
          type: Sequelize.STRING(150),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        image_profile: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        rol_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "rols",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        } 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
