'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
   await queryInterface.bulkInsert('categories', [
     {
       name: 'Hombre'
     },
     {
       name: 'Mujer'
     },
     {
       name: 'Niño'
     },
     {
       name: 'Niña'
     },
     {
       name: 'Bebe'
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
