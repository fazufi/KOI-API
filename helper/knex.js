const { default: knex } = require('knex')

module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: '192.168.1.21',
    user: 'root',
    password: '',
    database: 'koi'
  }

})
console.log("knex")

