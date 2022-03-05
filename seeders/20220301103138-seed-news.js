'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {

     const data = JSON.parse(fs.readFileSync("./data/news.json", 'UTF-8'))
     data.forEach((el) => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
     });
   return queryInterface.bulkInsert('News', data, {})
  },

  down (queryInterface, Sequelize) {

     return queryInterface.bulkDelete('News', null, {});
  }
};
