/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust path if needed

const FoundItem = sequelize.define('FoundItem', {
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
  FI_Id: {
    type: DataTypes.STRING,
    unique: true,
  }
}, {
  tableName: 'FoundItems',
  timestamps: true,
});

module.exports = FoundItem;
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FoundItem = sequelize.define('FoundItem', {
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
  tableName: 'FoundItems',
  timestamps: true,
});

FoundItem.associate = (models) => {
  FoundItem.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = FoundItem;
