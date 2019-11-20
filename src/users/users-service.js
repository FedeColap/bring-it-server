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
  
    getById(knex, id) {
      return knex
        .from('searchers')
        .select('*')
        .where('id', id)
        .first()
    },

  }
  
  module.exports = UsersService