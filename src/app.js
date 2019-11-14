require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const people = require('./users-data.js')

const app = express()

const morganOption = (NODE_ENV === 'production')? 'tiny': 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
     const authToken = req.get('Authorization')
     const apiToken = process.env.API_TOKEN

     console.log('validate bearer token middleware')
     if (!authToken || authToken.split(' ')[1] !== apiToken) {
          return res.status(401).json({ error: 'Unauthorized request' })
     }   
        // move to the next middleware
     next()
})

app.get('/', (req, res) => {
     res.send('Fede, Speranza e Carita')
})
app.get('/users', (req, res) => {     
     res.json(people)
})
app.get('/country', (req, res) => {
     const { search = ""} = req.query;
     // do some validation
  if (!search) {
     // mark is required
     return res
       .status(400)
       .send('Please provide a country');
   }
     
     let results = people
        .filter(person =>
          person
             .country
             .toLowerCase()
             .includes(search.toLowerCase()));
     res.json(results)
})
app.get('/month', (req, res) => {
     const { search = ""} = req.query;
     // do some validation
  if (!search) {
     // mark is required
     return res
       .status(400)
       .send('Please provide a month');
   }
     
     let results = people
        .filter(person =>
          person
             .country
             .toLowerCase()
             .includes(search.toLowerCase()));
     res.json(results)
})

app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
   } else {
        console.error(error)
        response = { message: error.message, error }
   }
   res.status(500).json(response)
})

module.exports = app;
