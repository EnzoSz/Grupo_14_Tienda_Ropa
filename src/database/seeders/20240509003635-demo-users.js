"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    //generamos 10 users
    for (let i = 0; i < 10; i++) {
      users.push({
        first_name: faker.internet.userName(),
        last_name: faker.internet.userName(),
        phone: faker.number.int(11),
        email: faker.internet.email(),
        address: `Calle ${i}`,
        password: faker.internet.password(),
        rol_id: 2,
      });
    }
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
