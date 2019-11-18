require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

console.log('knex and driver installed correctly');

knexInstance.from('users').select('*').where({first_name: 'Fede'})
    .then(result => {
        console.log(result)
    })