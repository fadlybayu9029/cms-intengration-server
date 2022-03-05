'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.News, { foreignKey: "userId" });
    }
  }
  Author.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty or null'
        },
        isEmail: {
          args: true,
          msg: 'Please input email format correctly (example@yahoo.com)'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot null'
        },
        len: {
          args: [5, 20],
          msg: `Password must containt with 5 Characters Minimum and 20 Maximum`
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
  });

  Author.beforeCreate(function(instance, option){
    instance.password = hashPassword(instance.password)
  })

  return Author;
};