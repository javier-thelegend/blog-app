const { Sequelize } = require('sequelize');
const { postgre } = require('./config');
const sequelize = new Sequelize(postgre.database, postgre.user, postgre.password, {
    host: postgre.host,
    port: postgre.port,
    dialect: 'postgres',
    logging: false
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;