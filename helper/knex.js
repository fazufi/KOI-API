const { default: knex } = require('knex')

module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'koi'
  }
  
})
console.log("knex")

