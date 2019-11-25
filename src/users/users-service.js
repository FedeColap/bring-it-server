const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/


const UsersService = {
    getAllUsers(knex) {
      return knex.select('*').from('searchers')
    },
  
    insertUser(knex, newUser) {
      return knex
        .insert(newUser)
        .into('searchers')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },

    validatePassword(password) {
      if (password.length < 8) {
        return 'Password must be longer than 8 characters'
      }
      if (password.length > 72) {
        return 'Password must be less than 72 characters'
      }
      if (password.startsWith(' ') || password.endsWith(' ')) {
        return 'Password must not start or end with empty spaces'
      }
      if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
        return 'Password must contain 1 upper case, lower case, number and special character'
      }
      return null
    },

    hasUserWithUserName(db, user_name) {
      return db('searchers')
          .where({ user_name })
          .first()
          .then(user => !!user)
  },

  }
  
  module.exports = UsersService