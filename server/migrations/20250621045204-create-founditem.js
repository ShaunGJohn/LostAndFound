'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FoundItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      itemCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
        unique: true
      },
      name: Sequelize.STRING,
      brand: Sequelize.STRING,
      category: Sequelize.STRING,
      location: Sequelize.STRING,
      date: Sequelize.DATE,
      imageUrl: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FoundItems');
  }
};
