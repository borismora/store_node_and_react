'use strict';
import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

const PROTECTED_ATTRIBUTES = ['id', 'password', 'passwordHash']

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: Sequelize.VIRTUAL, // When it is VIRTUAL it does not exist in the database
        passwordHash: {
          type: Sequelize.STRING,
          allowNull: false
        },
      },
      {
        sequelize,
        timestamps: true, // If it's false do not add the attributes (updatedAt, createdAt).
        // paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        // underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        // freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        // tableName: 'Users' //Define table name
      },
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(user.password, salt);
      }
    });

    return this;
  }

  toJSON() {
    // Hide protected fields
    let attributes = Object.assign({}, this.get())
    for (let a of PROTECTED_ATTRIBUTES) {
      delete attributes[a]
    }
    return attributes
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}

export default User;
