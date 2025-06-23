'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      phone: Sequelize.STRING,
      password: Sequelize.STRING,
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user'
      },
      
      profilePic: {
  type: Sequelize.STRING,
  allowNull: true
},

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
