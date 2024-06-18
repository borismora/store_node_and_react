'use strict';
import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init (sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        code: {
          type: Sequelize.STRING,
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
}

export default Category;
