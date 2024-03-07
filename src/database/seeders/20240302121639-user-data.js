
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ... repite este proceso para cada usuario

    await queryInterface.bulkInsert('users', [
      {
        last_name: 'Doe1',
        first_name: 'John1',
        phone: 1234567891,
        email: 'john1@example.com',
        birth_date: '1990-01-01',
        address: '123 Main St',
        password: 'password123', // Usa la contraseña encriptada
        image_profile: 'profile1.jpg',
        rol_id: 2,
      },
      {
        last_name: 'Doe2',
        first_name: 'John2',
        phone: 1234567892,
        email: 'john2@example.com',
        birth_date: '1990-02-02',
        address: '456 Oak St',
        password: 'password456', // Usa la contraseña encriptada
        image_profile: 'profile2.jpg',
        rol_id: 2,
      },
      // Repite este bloque para cada usuario adicional
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Implementa la lógica de reversión si es necesario
    await queryInterface.bulkDelete('users', null, {});
  },
};
