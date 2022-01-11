'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('soul_terceros',[
      {
        codigo: 'John',
        clave: bcrypt.hashSync('123456')
      },
      {
        codigo: 'Juan',
        clave: bcrypt.hashSync('123456')
      },
      {
        codigo: 'Dohe',
        clave: bcrypt.hashSync('123456')
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('soul_terceros', null, {})
  }
};
