const { Sequelize } = require('sequelize');
const config = require('@/config/db');
const sequelize = new Sequelize(config);
sequelize.sync({ alter: true });
module.exports = sequelize;