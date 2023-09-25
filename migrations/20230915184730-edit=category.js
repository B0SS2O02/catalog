'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'categories',
      'category_ID',
      {
        type: Sequelize.INTEGER, // Замените тип данных на необходимый
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'category_ID');
  }
};
