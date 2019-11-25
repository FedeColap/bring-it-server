require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const winston = require('winston');
const tripsRouter = require('./trips/trips-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const app = express()
const jsonParser = express.json()

const morganOption = (NODE_ENV === 'production')? 'tiny': 'common';

app.use(morgan(morganOption))
app.use(express.json());
app.use(helmet())
app.use(cors())

app.use('/api/trips', tripsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)


// set up winston
const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'info.log' })
     ]
   });
   
   if (NODE_ENV !== 'production') {
     logger.add(new winston.transports.Console({
       format: winston.format.simple()
     }));
   }


app.get('/', (req, res) => {
     res.send('Fede, Speranza e Carita')
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
