'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      phone:  {
        type: Sequelize.STRING
      },
      selectedContent:  {
        type: Sequelize.STRING
      },
      otherContent:  {
        type: Sequelize.STRING
      },
      selectedTimes:  {
        type: Sequelize.STRING
      },
      otherTime: {
        type: Sequelize.STRING
      },
      selectedDate: {
        type: Sequelize.STRING
      },
      trangThai: {
        type: Sequelize.STRING
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedules');
  }
};