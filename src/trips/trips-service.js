const TripsService = {
    
    getAllTrips(db) {
      return db
        .from('trips')
        // .select('*')
        .leftJoin(
            'searchers',
            'trips.user_id',
            'searchers.id'
        )
        .select(
            'searchers.id',
            'searchers.user_name',
            'searchers.email',
            'trips.country',
            'trips.month'
        )
    },
    insertTrip(knex, newTrip) {
        return knex
            .insert(newTrip)
            .into('trips')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
  
    
  
    serializeArticle(article) {
      const { author } = article
      return {
        id: article.id,
        style: article.style,
        title: xss(article.title),
        content: xss(article.content),

        author: {
          id: author.id,
          user_name: author.user_name,
          full_name: author.full_name,
          nickname: author.nickname,

        },
      }
    },
  

  }








// const TripsService = {
//     getAllTrips(knex) {
//         return knex.select('*').from('trips')
//     },
//     insertTrip(knex, newTrip) {
//         return knex
//             .insert(newTrip)
//             .into('trips')
//             .returning('*')
//             .then(rows => {
//                 return rows[0]
//             })
//     },
//     getById(knex, id) {
//         return knex.from('trips').select('*').where('id', id).first()
//     },
// }

module.exports = TripsService