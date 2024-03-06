// 20240302121639-rols-data.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserta los roles en la tabla 'rols'
    await queryInterface.bulkInsert('rols', [
      {
        name: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cliente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  /*   // Obtén los IDs de los roles recién insertados
    const adminRole = await queryInterface.sequelize.query(
      'SELECT id FROM rols WHERE name = "Administrador"',
    );
    const clientRole = await queryInterface.sequelize.query(
      'SELECT id FROM rols WHERE name = "Cliente"',
    );

    // Asigna los roles a las variables para su uso posterior
    const adminRoleId = adminRole[0][0].id;
    const clientRoleId = clientRole[0][0].id;

    // Actualiza la columna 'rol_id' en la tabla 'users' para algunos usuarios
    await queryInterface.bulkUpdate('users', {
      rol_id: adminRoleId, // Asigna el rol de administrador a algunos usuarios
    }, {
      // Aquí debes especificar las condiciones para seleccionar los usuarios a actualizar
      // Por ejemplo, podrías actualizar a algunos usuarios donde el email sea 'admin@example.com'
      email: 'admin@example.com',
    });

    await queryInterface.bulkUpdate('users', {
      rol_id: clientRoleId, // Asigna el rol de cliente a algunos usuarios
    }, {
      // Aquí debes especificar las condiciones para seleccionar los usuarios a actualizar
      // Por ejemplo, podrías actualizar a algunos usuarios donde el email sea 'cliente@example.com'
      email: 'cliente@example.com',
    }); */
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina los roles de la tabla 'rols'
    await queryInterface.bulkDelete('rols', null, {});
  },
};

