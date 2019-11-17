require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const people = require('./users-data.js')
const uuid = require('uuid/v4');
const winston = require('winston');

const app = express()

const morganOption = (NODE_ENV === 'production')? 'tiny': 'common';

app.use(morgan(morganOption))
app.use(express.json());
app.use(helmet())
app.use(cors())

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

const users = [
     {
          "id": "2fdab114-014d-4f1b-827c-b3872b1aec93",
          "first_name": "Oscar",
          "last_name": "Jarjayes",
          "user_name": "LadyOscar",
          "email": "madamigella@gpost.fr",
          "password": "veryg00dpassw0rd", 
          "country": "France", 
          "month": "jun"
      },
      {
          "id": "d3c738e4-324e-417b-9800-d93a8705de82",
          "first_name": "Andre",
          "last_name": "Grandier",
          "user_name": "Bellocchio",
          "email": "domestico@gpoor.fr",
          "password": "veryg00dpassw0rd2",
          "country": "Italy", 
          "month": "jan"
      },
      {
          "id": "1",
          "first_name": "Alex",
          "last_name" : "Swartz", 
          "user_name" : "Axax",
          "email" : "sincere@april.biz",
          "password" : "veryg00dpassw0rd3", 
          "country" : "Austria", 
          "month" : "jan"
      },
      {
          "id": "2",
          "first_name": "Antonia",
          "last_name" : "Howell", 
          "user_name" : "Antonette",
          "email" : "shanna@melissa.tv",
          "password" : "veryg00dpassw0rd4", 
          "country" : "Spain", 
          "month" : "feb"
      },
      {
          "id": "3",
          "first_name": "Clementine",
          "last_name" : "Bauch", 
          "user_name" : "Samantha",
          "email" : "nathan@yesenia.net",
          "password" : "veryg00dpassw0rd5", 
          "country" : "Greece", 
          "month" : "mar"
      },
      {
          "id": "4",
          "first_name": "Patricia",
          "last_name" : "Lebsack", 
          "user_name" : "Kariann",
          "email" : "julianne.OConner@kory.org",
          "password" : "veryg00dpassw0rd6", 
          "country" : "France", 
          "month" : "apr"
      },
      {
          "id": "5",
          "first_name": "Chelsey",
          "last_name" : "Dietrich", 
          "user_name" : "Kamren",
          "email" : "lucio_Hettinger@annie.ca",
          "password" : "veryg00dpassw0rd7", 
          "country" : "Venezuela", 
          "month" : "may"
      },
      {
          "id": "6",
          "first_name": "Kurtis",
          "last_name" : "Weissnat", 
          "user_name" : "Skiles",
          "email" : "karley_Dach@jasper.info",
          "password" : "veryg00dpassw0rd8", 
          "country" : "Germany", 
          "month" : "jun"
      },
      {
          "id": "7",
          "first_name": "Nicholas",
          "last_name" : "Runolfsdottir", 
          "user_name" : "Maxime",
          "email" : "telly.Hoeger@billy.biz",
          "password" : "veryg00dpassw0rd9", 
          "country" : "Russia", 
          "month" : "jul"
      },
      {
          "id": "8",
          "first_name": "Glenna",
          "last_name" : "Reichert", 
          "user_name" : "Delphine",
          "email" : "sherwood@rosamond.me",
          "password" : "veryg00dpassw0rd10", 
          "country" : "Canada", 
          "month" : "aug"
      },
      {
          "id": "9",
          "first_name": "Clementina",
          "last_name" : "DuBuque", 
          "user_name" : "Moriah",
          "email" : "fail@fefiemail.it",
          "password" : "veryg00dpassw0rd22", 
          "country" : "Australia", 
          "month" : "sep"
      },
      {
          "id": "10",
          "first_name": "Fede",
          "last_name" : "Cola", 
          "user_name" : "Fede2",
          "email" : "fedecola@fefi.it",
          "password" : "veryg00dpassw0rd23", 
          "country" : "Italy", 
          "month" : "dec"
      },
      {
          "id": "11",
          "first_name": "Akito",
          "last_name" : "Hayama", 
          "user_name" : "Eric",
          "email" : "notwithsana@gpost.jp",
          "password" : "veryg00dpassw0rd24", 
          "country" : "Italy", 
          "month" : "dec"
      },
      {
          "id": "12",
          "first_name": "Michael",
          "last_name" : "Scott", 
          "user_name" : "dunder",
          "email" : "mifflina@gpost.ny",
          "password" : "veryg00dpassw0rd25", 
          "country" : "China", 
          "month" : "jan"
      },
];

// app.use(function validateBearerToken(req, res, next) {
//      const authToken = req.get('Authorization')
//      const apiToken = process.env.API_TOKEN

//      console.log('validate bearer token middleware')
     
//      if (!authToken || authToken.split(' ')[1] !== apiToken) {
//           logger.error(`Unauthorized request to path: ${req.path}`);
//           return res.status(401).json({ error: 'Unauthorized request' })
//      }   
//         // move to the next middleware
//      next()
// })

app.get('/', (req, res) => {
     res.send('Fede, Speranza e Carita')
})

app.get('/users', (req, res) => {     
     //THIS IS THE ARRAY AT LINE 19, IF YOU WANNA PLAY WITH THE PEOPLE ARRAY, YOU HAVE TO SWITCH NAME
     res.json(users)
})
app.post('/users', (req, res) => {
     const { first_name, last_name, user_name, email, password, confirm_password } = req.body;
     console.log(req.body);
     // validation code here
     if (!first_name || !last_name) {
          return res
          .status(400)
          .send('Please provide your complete name');
     }
     
     if (!password) {
          return res
          .status(400)
          .send('Password required');
     }
     if (password !== confirm_password) {
          return res
          .status(400)
          .send('Password and confirmation must match');
     }
     
     if (!email) {
          return res
          .status(400)
          .send('Email required');
     }
     if (user_name.length < 6 || user_name.length > 20) {
          return res
            .status(400)
            .send('Username must be between 6 and 20 characters');
        }   
     // password length
     if (password.length < 8 || password.length > 36) {
          return res
            .status(400)
            .send('Password must be between 8 and 36 characters');
     }   
     // password contains digit, using a regex here
     if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
          return res
            .status(400)
            .send('Password must be contain at least one digit');
     }
     // at this point all validation passed
     const id = uuid();
     const newUser = {
          id,
          first_name,
          last_name,
          user_name,
          email, 
          password,
     };

     users.push(newUser);

     res.send('All validation passed');
});
app.get('/search', (req, res) => {
     const { nation = "" } = req.query;
     // do some validation
  if (!nation) {
     // mark is required
     return res
       .status(400)
       .send('Please provide a country');
   }
     
   let results = users
           .filter(person =>
             person
                .country
                .toLowerCase()
                .includes(nation.toLowerCase()));
        res.json(results)
})
// app.get('/search', (req, res) => {
//      const { period = ""} = req.query;
//      // do some validation
//   if (!period) {
//      // mark is required
//      return res
//        .status(400)
//        .send('Please provide a month');
//    }
     
//      let results = users
//         .filter(person =>
//           person
//              .month
//              .toLowerCase()
//              .includes(period.toLowerCase()));
//      res.json(results)
// })

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
