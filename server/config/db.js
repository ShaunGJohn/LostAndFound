require('dotenv').config(); // This must come BEFORE using process.env

const { Sequelize } = require('sequelize');
console.log('DB_USER:', process.env.DB_USER); // This should show: root

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
  }
);

module.exports = sequelize;
