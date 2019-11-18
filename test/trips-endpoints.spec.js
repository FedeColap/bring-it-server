const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeTripsArray } = require('./trips.fixtures')

describe('Trips Endpoints', function() {
    let db

    before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        })

        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('trips').truncate())

    afterEach('cleanup', () => db('trips').truncate())

    describe(`GET /trips`, () => {

        context(`Given no trips`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                .get('/trips')
                .expect(200, [])
            })
        })


        context('Given there are trips in the database', () => {
            const testTrips =  makeTripsArray()

            beforeEach('insert trips', () => {
                return db
                .into('trips')
                .insert(testTrips)
            })
            it('GET /trips responds with 200 and all of the trips', () => {
                return supertest(app)
                    .get('/trips')
                    .expect(200, testTrips)
            })
        })
    })

    describe(`GET /trips/:trip_id`, () => {

        context(`Given no trips`, () => {
            it(`responds with 404`, () => {
                const tripId = 123456
                return supertest(app)
                    .get(`/trips/${tripId}`)
                    .expect(404, { error: { message: `Trip doesn't exist` } })
            })
        })

        context('Given there are trips in the database', () =>{
            const testTrips =  makeTripsArray()
        
            beforeEach('insert trips', () => {
                return db
                .into('trips')
                .insert(testTrips)
            })
            it('GET /trips/:trip_id responds with 200 and the specified article', () => {
                const tripId = 2
                const expectedTrip = testTrips[tripId - 1]
                return supertest(app)
                    .get(`/trips/${tripId}`)
                    .expect(200, expectedTrip)
            })
        })
    })

    describe.only(`POST /trips`, () => {
        it(`creates a trip, responding with 201 and the new trip`,  function() {
            const newTrip = {
                country: 'Nicaragua',
                month: 'nov',
            }
            return supertest(app)
                .post('/trips')
                .send(newTrip)
                .expect(201)
                .expect(res => {
                    expect(res.body.country).to.eql(newTrip.country)
                    expect(res.body.month).to.eql(newTrip.month)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/trips/${res.body.id}`)
                })
                .then(postRes =>
                    supertest(app)
                    .get(`/trips/${postRes.body.id}`)
                    .expect(postRes.body)
                )
        })
        it(`responds with 400 and an error message when the 'country' is missing`, () => {
            return supertest(app)
                .post('/trips')
                .send({
                    month: 'feb',

                })
                .expect(400, {
                    error: { message: `Missing 'country' in request body` }
                })
        })
        it(`responds with 400 and an error message when the 'month' is missing`, () => {
            return supertest(app)
                .post('/trips')
                .send({
                    country: 'India',

                })
                .expect(400, {
                    error: { message: `Missing 'month' in request body` }
                })
        })
    })
        
    

})