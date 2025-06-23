/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust this path if needed

const LostItem = sequelize.define('LostItem', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  LI_Id: {
    type: DataTypes.STRING,
    unique: true,
  }
}, {
  tableName: 'LostItems', // Must match the table name in your migration
  timestamps: true,
});

module.exports = LostItem;
*/


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LostItem = sequelize.define('LostItem', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemCode: {
    type: DataTypes.STRING(5),
    allowNull: false,
    unique: true,
  },
  name: DataTypes.STRING,
  brand: DataTypes.STRING,
  category: DataTypes.STRING,
  location: DataTypes.STRING,
  date: DataTypes.DATE,
  imageUrl: DataTypes.STRING
}, {
  tableName: 'LostItems',
  timestamps: true,
});

module.exports = LostItem;
