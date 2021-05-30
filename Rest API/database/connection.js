var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'P@ssword2020',
      database : 'apiUser'
    }
  });

module.exports = knex