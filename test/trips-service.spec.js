const TripsService = require('../src/trips-service')
const knex = require('knex')

describe(`Trips service object`, function() {
    let db
    let testTrips = [
            {
                 id: 1,
                 country: "France", 
                 month: "jun"
             },
             {
                 id: 2,
                 country: "Italy", 
                 month: "jan"
             },
             {
                id: 3,
                country : "Austria", 
                month : "jan"
             },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })
    before(() => db('trips').truncate())
    afterEach(() => db('trips').truncate())

    after(() => db.destroy())


    context(`Given 'trips' has data`, () => {
        beforeEach(() => {
            return db
            .into('trips')
            .insert(testTrips)
        })
        it(`getAllTrips() resolves all trips from 'trips' table`, () => {
            // test that TripsService.getAllTrips gets data from table
            return TripsService.getAllTrips(db)
            .then(actual => {
                expect(actual).to.eql(testTrips)
            })
        })
        it(`getById() resolves an article by id from 'blogful_articles' table`, () => {
            const thirdId = 3
            const thirdTestTrip = testTrips[thirdId - 1]
                 return TripsService.getById(db, thirdId)
                   .then(actual => {
                        expect(actual).to.eql({
                            id: thirdId,
                            country: thirdTestTrip.country,
                            month: thirdTestTrip.month,
                        })
                   })
               })
    })

    context(`Given 'trips' has no data`, () => {
        it(`getAllTrips() resolves an empty array`, () => {
            return TripsService.getAllTrips(db)
            .then(actual => {
                expect(actual).to.eql([])
            })
        })
        it(`insertTrip() inserts a new trip and resolves the new trip with an 'id'`, () => {
            const newTrip = {
                country: 'Japan',
                month: 'may',
            }
            return TripsService.insertTrip(db, newTrip)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        country: newTrip.country,
                        month: newTrip.month,
                    })
                })
        })

    })
})