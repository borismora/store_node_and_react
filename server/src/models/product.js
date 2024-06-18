'use strict';
import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init (sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL,
          allowNull: false
        },
        image: {
          type: Sequelize.TEXT,
          allowNull: false
        }
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  static associate (models) {
    this.belongsTo(models.Category, { foreignKey: 'categoryId' });
    this.hasMany(models.OrderProduct, { foreignKey: 'productId' });
  }
}

export default Product;
