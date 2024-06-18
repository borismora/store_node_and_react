'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );
    const statuses = ['created', 'paid', 'pending', 'completed', 'failed'];

    const orders = [];

    for (let i = 0; i < 3; i++) {
      const order = {
        userId: users[0][Math.floor(Math.random() * users[0].length)].id,
        total: faker.commerce.price(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentType: 'cash',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      orders.push(order);
    }

    for (let i = 0; i < 2; i++) {
      const orderOnlinePayment = {
        userId: users[0][Math.floor(Math.random() * users[0].length)].id,
        total: faker.commerce.price(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentType: 'online',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      orders.push(orderOnlinePayment);
    }

    await queryInterface.bulkInsert('Orders', orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
