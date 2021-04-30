const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'P@ssword2020',
      database : 'knex'
    }
});

module.exports = knex ;