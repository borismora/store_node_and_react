'use strict';
import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init (sequelize) {
    super.init(
      {
        userId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        total: {
          type: Sequelize.DECIMAL,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM,
          values: ['created', 'paid', 'pending', 'completed', 'failed'],
          defaultValue: 'created'
        },
        paymentType: {
          type: Sequelize.ENUM,
          values: ['cash', 'online'],
          defaultValue: 'cash'
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
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.OrderProduct, { foreignKey: 'orderId' });
  }
}

export default Order;
