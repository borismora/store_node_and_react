'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [
      {
        name: 'Alimentos y bebidas',
        code: 'alimentos_y_bebidas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Animales y mascotas',
        code: 'animales_y_mascotas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Teléfonos',
        code: 'telefonos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Computación',
        code: 'computacion',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Consolas y videojuegos',
        code: 'consolas_y_videojuegos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Electrónica, audio y video',
        code: 'electronica_audio_y_video',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Libros, revistas y Comics',
        code: 'libros_revistas_y_comics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Música, películas y series',
        code: 'musica_peliculas_y_series',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('Categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
