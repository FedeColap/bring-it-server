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

    getById(knex, id) {
        return knex.from('trips').select('*').where('id', id).first()
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
  
  

}


module.exports = TripsService