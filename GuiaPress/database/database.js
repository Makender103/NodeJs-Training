const Sequelize = require("sequelize")

const connection = new Sequelize("guiaPress", 'root', 'P@ssword2020', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection ;