/*const Sequelize = require('sequelize');
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

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


// Export all models for use in controllers
module.exports = models;
*/


const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Import all models
const User = require('./User');
const LostItem = require('./LostItem');
const FoundItem = require('./FoundItem');
const Request = require('./Request');

// Initialize models object
const db = {
  sequelize,
  Sequelize,
  User,
  LostItem,
  FoundItem,
  Request
};

// Call associate if defined
if (User.associate) User.associate(db);
if (LostItem.associate) LostItem.associate(db);
if (FoundItem.associate) FoundItem.associate(db);
if (Request.associate) Request.associate(db);

module.exports = db;
