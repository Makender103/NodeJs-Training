const Sequelize = require('sequelize');

const connection = new Sequelize('guiaPerguntas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection ;