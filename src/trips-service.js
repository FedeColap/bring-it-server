const TripsService = {
    getAllTrips(knex) {
        return knex.select('*').from('trips')
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
    getById(knex, id) {
        return knex.from('trips').select('*').where('id', id).first()
    },
}

module.exports = TripsService