'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('brands', [
      {
        name: 'Adidas',
      },
      {
        name: 'Puma'
      },
      {
        name: 'Reebok'
      },
      {
        name: 'Vans'
      },
      {
        name: 'New Balance'
      },
      {
        name: 'Levis'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};
