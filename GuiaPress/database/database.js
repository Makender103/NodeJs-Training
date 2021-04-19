const Sequelize = require("sequelize")

const connection = new Sequelize("guiaPress", 'root', 'P@ssword2020', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection ;