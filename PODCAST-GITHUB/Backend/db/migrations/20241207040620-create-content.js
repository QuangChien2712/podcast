'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeRole: {
        type: Sequelize.STRING
      },
      tenBaiViet: {
        type: Sequelize.STRING
      },
      chuDe: {
        type: Sequelize.STRING
      },
      moTaNgan: {
        type: Sequelize.STRING
      },
      noiDung: {
        type: Sequelize.STRING
      },
      hinhAnh: {
        type: Sequelize.STRING
      },
      audio: {
        type: Sequelize.STRING
      },
      thuTuHienThi: {
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
    await queryInterface.dropTable('Contents');
  }
};