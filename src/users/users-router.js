const UsersService = require('./users-service')
const express = require('express')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, user_name } = req.body
    for (const field of ['first_name', 'last_name', 'user_name', 'email', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

      const passwordError = UsersService.validatePassword(password)
        
      if (passwordError)
        return res.status(400).json({ error: passwordError })

        UsersService.hasUserWithUserName(
          req.app.get('db'),
          user_name
      )
      .then(hasUserWithUserName => {
          if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

          res.send('ok')
      })
      .catch(next)
    
  })

module.exports = usersRouter



















// const path = require('path')
// const express = require('express')
// const xss = require('xss')
// const UsersService = require('./users-service')

// const usersRouter = express.Router()
// const jsonParser = express.json()

// const serializeUser = user => ({
//   id: user.id,
//   first_name: xss(user.first_name),
//   last_name: xss(user.last_name),
//   user_name: xss(user.user_name),
//   email: xss(user.email),
//   password: xss(user.password)
// })

// usersRouter
//   .route('/')
//   .get((req, res, next) => {
//     const knexInstance = req.app.get('db')
//     UsersService.getAllUsers(knexInstance)
//       .then(users => {
//         res.json(users.map(serializeUser))
//       })
//       .catch(next)
//   })
//   .post(jsonParser, (req, res, next) => {
//     const { first_name, last_name, user_name, email, password } = req.body
//     const newUser = { first_name, last_name, user_name, email, password }

//     for (const [key, value] of Object.entries(newUser)) {
//       if (value == null) {
//         return res.status(400).json({
//           error: { message: `Missing '${key}' in request body` }
//         })
//       }
//     }
//     if (password !== confirm_password) {
//         return res
//             .status(400)
//             .send('Password and confirmation must match');
//     }

//     newUser.user_name = user_name;
//     newUser.password = password;

//     UsersService.insertUser(
//       req.app.get('db'),
//       newUser
//     )
//       .then(user => {
//         res
//           .status(201)
//           .location(path.posix.join(req.originalUrl, `/${user.id}`))
//           .json(serializeUser(user))
//       })
//       .catch(next)
//   })

// usersRouter
//   .route('/:user_id')
//   .all((req, res, next) => {
//     UsersService.getById(
//       req.app.get('db'),
//       req.params.user_id
//     )
//       .then(user => {
//         if (!user) {
//           return res.status(404).json({
//             error: { message: `User doesn't exist` }
//           })
//         }
//         res.user = user
//         next()
//       })
//       .catch(next)
//   })
//   .get((req, res, next) => {
//     res.json(serializeUser(res.user))
//   })

// module.exports = usersRouter






