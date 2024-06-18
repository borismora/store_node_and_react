'use strict';
import Sequelize, { Model } from 'sequelize';

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        type: {
          type: Sequelize.ENUM,
          values: ['mercado_pago'],
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM,
          values: ['created', 'paid', 'failed'],
          defaultValue: 'created'
        },
        externalStatus: Sequelize.STRING,
        amount: {
          type: Sequelize.DECIMAL,
          allowNull: false
        },
        externalData: Sequelize.JSONB
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
  }
}

export default Payment;
