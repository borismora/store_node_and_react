'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const orders = await queryInterface.sequelize.query(
      `SELECT id FROM "Orders";`
    );

    const products = await queryInterface.sequelize.query(
      `SELECT id FROM "Products";`
    );

    const orderProducts = [];

    for (let i = 0; i < 7; i++) {
      const orderProduct = {
        orderId: orders[0][Math.floor(Math.random() * orders[0].length)].id,
        productId: products[0][Math.floor(Math.random() * products[0].length)].id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      orderProducts.push(orderProduct);
    }

    await queryInterface.bulkInsert('OrderProducts', orderProducts, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderProducts', null, {});
  }
};
