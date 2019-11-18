require('dotenv').config()
const knex = require('knex')
const TripsService = require('./trips-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

TripsService.getAllTrips(knexInstance)
  .then(trips => console.log(trips))
  .then(() =>
    TripsService.insertTrip(knexInstance, {
      country: 'Madagascar',
      month: 'oct',
    })
  )
  .then(trips => console.log(trips))