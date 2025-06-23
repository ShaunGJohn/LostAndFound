const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User');
const LostItem = require('./LostItem');
const FoundItem = require('./FoundItem');
const Request = require('./Request');

// Build models object to pass into associate()
const models = {
  User,
  LostItem,
  FoundItem,
  Request
};

// Call associate methods
if (Request.associate) {
  Request.associate(models);
}

// Export all models for use in controllers
module.exports = models;
