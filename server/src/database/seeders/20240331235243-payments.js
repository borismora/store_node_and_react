'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = await queryInterface.sequelize.query(
      `SELECT id FROM "Orders" WHERE "paymentType" = 'online';`
    );
    const statuses = ['created', 'paid', 'failed'];

    const payments = [];

    for (let i = 0; i < orders[0].length; i++) {
      const payment = {
        orderId: orders[0][Math.floor(Math.random() * orders[0].length)].id,
        type: 'mercado_pago',
        status: statuses[Math.floor(Math.random() * statuses.length)],
        externalStatus: 'paid',
        amount: faker.commerce.price(),
        externalData: JSON.stringify({
          id: faker.string.uuid(),
          status: 'paid',
          date_created: faker.date.recent(),
          date_approved: faker.date.recent(),
          date_last_modified: faker.date.recent()
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      payments.push(payment);
    }

    await queryInterface.bulkInsert('Payments', payments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};
