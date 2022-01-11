'use strict';
const bcryptjs = require('bcryptjs');

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
      return queryInterface.bulkInsert('soul_usuarios',[
        {
          login: 'John',
          clave2: bcryptjs.hashSync('123456')
        },
        {
          login: 'Juan',
          clave2: bcryptjs.hashSync('123456')
        },
        {
          login: 'Dohe',
          clave2: bcryptjs.hashSync('123456')
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
    return queryInterface.bulkDelete('soul_usuarios', null, {})
  }
};
