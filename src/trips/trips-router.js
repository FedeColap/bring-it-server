const path = require('path')
const express = require('express')
const TripsService = require('./trips-service')

const tripsRouter = express.Router()
const jsonParser = express.json()

tripsRouter
  .route('/')
  .get((req, res, next) => {
    TripsService.getAllTrips(
      req.app.get('db')
    )
      .then(trips => {
        res.json(trips)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { country, month, user_id } = req.body
    const newTrip = { country, month }
    
    if(!country) {
      return res.status(400).json({
        error: { message: `Missing 'country' in request body` }
      })
    }
    if(!month) {
      return res.status(400).json({
        error: { message: `Missing 'month' in request body` }
      })
    }
    
    newTrip.user_id = user_id

    TripsService.insertTrip(
        req.app.get('db'),
        newTrip
    )
    .then(trip => {
        res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${trip.id}`))
        .json(trip)
    })
        .catch(next)
  })

  tripsRouter
  .route('/:trip_id')
  .get((req, res, next) => {
    const knex = req.app.get('db')
    TripsService.getById(knex, req.params.trip_id)
        .then(trip => {
            if (!trip) {
                return res.status(404).json({
                    error: { message: `Trip doesn't exist` }
                })
            }
            res.json(trip)
        })
        .catch(next)
  })

module.exports = tripsRouter