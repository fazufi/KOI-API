const { default: knex } = require('knex')

module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: '192.168.1.21',
    user: 'root',
    password: '',
    database: 'koi'
  }
  
  // pool: { min: 0, max: 200000, acquireTimeoutMillis: 600 * 100000 },

})
console.log("knex")

