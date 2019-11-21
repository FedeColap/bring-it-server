require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
// const validateBearerToken = require('./validate-bearer-token')
const winston = require('winston');
const tripsRouter = require('./trips/trips-router')
const usersRouter = require('./users/users-router')

const app = express()
const jsonParser = express.json()

const morganOption = (NODE_ENV === 'production')? 'tiny': 'common';

app.use(morgan(morganOption))
app.use(express.json());
app.use(helmet())
app.use(cors())

app.use('/api/trips', tripsRouter)
app.use('/api/users', usersRouter)


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

// app.use(validateBearerToken)


app.get('/', (req, res) => {
     res.send('Fede, Speranza e Carita')
})



// app.get('/users', (req, res) => {     
//      //THIS IS THE ARRAY AT LINE 19, IF YOU WANNA PLAY WITH THE PEOPLE ARRAY, YOU HAVE TO SWITCH NAME
//      res.json(users)
// })
// app.post('/users', (req, res) => {
//      const { first_name, last_name, user_name, email, password, confirm_password } = req.body;
//      console.log(req.body);
//      // validation code here
//      if (!first_name || !last_name) {
//           return res
//           .status(400)
//           .send('Please provide your complete name');
//      }
     
//      if (!password) {
//           return res
//           .status(400)
//           .send('Password required');
//      }
//      if (password !== confirm_password) {
//           return res
//           .status(400)
//           .send('Password and confirmation must match');
//      }
     
//      if (!email) {
//           return res
//           .status(400)
//           .send('Email required');
//      }
//      if (user_name.length < 6 || user_name.length > 20) {
//           return res
//             .status(400)
//             .send('Username must be between 6 and 20 characters');
//         }   
//      // password length
//      if (password.length < 8 || password.length > 36) {
//           return res
//             .status(400)
//             .send('Password must be between 8 and 36 characters');
//      }   
//      // password contains digit, using a regex here
//      if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
//           return res
//             .status(400)
//             .send('Password must be contain at least one digit');
//      }
//      // at this point all validation passed
//      const id = uuid();
//      const newUser = {
//           id,
//           first_name,
//           last_name,
//           user_name,
//           email, 
//           password,
//      };

//      users.push(newUser);

//      res.send('All validation passed');
// });



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
