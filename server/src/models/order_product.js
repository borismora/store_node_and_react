'use strict';
import Sequelize, { Model } from 'sequelize';

class OrderProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        productId: {
          type: Sequelize.INTEGER,
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

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'orderId' });
    this.belongsTo(models.Product, { foreignKey: 'productId' });
  }
}

export default OrderProduct;
