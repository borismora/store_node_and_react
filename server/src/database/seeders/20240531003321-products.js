'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = [];
    const categories = await queryInterface.sequelize.query(
      'SELECT * FROM "Categories"', { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    console.log(categories)

    categories.map(async (category) => {
      const dataProducts = fs.readFileSync(`./src/data-json/${category.code}.json`, 'utf8');
      const productsCategory = JSON.parse(dataProducts);

      productsCategory.map((product) => {
        products.push({
          name: product.title,
          price: Math.floor(product.price),
          image: product.image,
          categoryId: category.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
