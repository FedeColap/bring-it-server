const UsersService = require('./users-service')
const path = require('path')
const express = require('express')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { first_name, last_name, user_name, email, password, repeat_password } = req.body

    for (const field of ['first_name', 'last_name', 'user_name', 'email', 'password', 'repeat_password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

      if ( password !== repeat_password )
      return res.status(400).json({ error: `Password and confirmation must match`  })

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

          return UsersService.hashPassword(password)
          .then(hashedPassword => {

            const newUser = {
                first_name,
                last_name,
                user_name,
                email,
                password: hashedPassword,
            }
            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                    .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
    
  })

module.exports = usersRouter


