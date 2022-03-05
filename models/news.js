'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Author, { foreignKey: "userId" });
      News.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  News.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot null or empty'
        }
      }
    },
    content:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Content cannor null or empty'
        }
      }
    },
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};