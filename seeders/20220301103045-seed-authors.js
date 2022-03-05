'use strict';
const fs = require('fs')
const { hashPassword } = require('../helper/bcrypt')

module.exports = {
  up (queryInterface, Sequelize) {

    const data = JSON.parse(fs.readFileSync("./data/authors.json", 'UTF-8'))
     data.forEach((el) => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
       el.password = hashPassword(el.password)
     });
   return queryInterface.bulkInsert('Authors', data, {})
  },

  down (queryInterface, Sequelize) {

     return queryInterface.bulkDelete('Authors', null, {});
  }
};
