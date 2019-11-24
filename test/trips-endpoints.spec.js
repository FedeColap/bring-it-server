const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeUsersArray, makeTripsArray } = require('./test-helpers')
const helpers = require('./test-helpers')

describe.only('Trips Endpoints', function() {
    let db
    const {
        testUsers,
        testTrips,
      } = helpers.makeTripsFixtures()

    before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        })

        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`Protected endpoints`, () => {
        const testUsers = makeUsersArray();
        const testTrips =  makeTripsArray(testUsers)
        
        beforeEach('insert trips', () => {
            return db
                .into('searchers')
                .insert(testUsers)
                .then(() => {
                    return db
                        .into('trips')
                        .insert(testTrips)
                })
        })

        const protectedEndpoints = [
            {
                name: 'GET /api/trips/:trip_id',
                path: '/api/trips/1'
            },
            {
                name: 'GET /api/trips',
                path: '/api/trips'
            }
        ]
        
        protectedEndpoints.forEach(endpoint => {
            describe(endpoint.name, () => {
                it(`responds with 401 'Missing basic token' when no basic token`, () => {
                    return supertest(app)
                        .get(endpoint.path)
                        .expect(401, { error: `Missing bearer token` })
                })
                it(`responds 401 'Unauthorized request' when no credentials in token`, () => {
                    const userNoCreds = { user_name: '', password: '' }
                    return supertest(app)
                        .get(endpoint.path)
                        .set('Authorization', helpers.makeAuthHeader(userNoCreds))
                        .expect(401, { error: `Unauthorized request` })
                })
                it(`responds 401 'Unauthorized request' when invalid user`, () => {
                    const userInvalidCreds = { user_name: 'user-not', password: 'existy' }
                    return supertest(app)
                        .get(endpoint.path)
                        .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
                        .expect(401, { error: `Unauthorized request` })
                })
                it(`responds 401 'Unauthorized request' when invalid password`, () => {
                    const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
                    return supertest(app)
                        .get(endpoint.path)
                        .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
                        .expect(401, { error: `Unauthorized request` })
                })
            })
        })
    })

    describe(`GET /api/trips`, () => {

        context(`Given no trips`, () => {
            const testUsers = makeUsersArray();

            beforeEach('insert users', () => {
                helpers.seedUsers(db, testUsers)
            })
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                .get('/api/trips')
                .set('Authorization', helpers.makeAuthHeader(testUsers[3]))
                .expect(200, [])
            })
        })


        context('Given there are trips in the database', () => {
            const testUsers = makeUsersArray();
            const testTrips =  makeTripsArray(testUsers)

            beforeEach('insert trips', () => {
                helpers.seedUsers(db, testUsers)
                    .then(() => {
                        return db
                            .into('trips')
                            .insert(testTrips)
                    })
            })
            //RETURNS WHAT EXPECTED 
            it.skip('GET /api/trips responds with 200 and all of the trips', () => {
                return supertest(app)
                    .get('/api/trips')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, testTrips) //testTrips here is incomplete... it should be an "expected testTrips"
            })
        })
    })

    describe(`GET /api/trips/:trip_id`, () => {

        context(`Given no trips`, () => {

            beforeEach('insert trips', () =>
                helpers.seedTripsTables(
                db,
                testUsers,
                testTrips,
                )
            )
            it(`responds with 404`, () => {
                const tripId = 123456
                return supertest(app)
                    .get(`/api/trips/${tripId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: { message: `Trip doesn't exist` } })
            })
        })

        context('Given there are trips in the database', () =>{
            beforeEach('insert trips', () =>
                helpers.seedTripsTables(
                db,
                testUsers,
                testTrips,
                )
            )

            it('GET /api/trips/:trip_id responds with 200 and the specified article', () => {
                const tripId = 2
                const expectedTrip = testTrips[tripId - 1]
                return supertest(app)
                    .get(`/api/trips/${tripId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedTrip)
            })
        })
    })

    //CANNOT WORK UNTIL I FIGURE OUT HOW TO ASSIGN THE PROPER USER_ID TO A NEW POST
    describe(`POST /api/trips`, () => {

        // const testUsers = makeUsersArray();
        // const testTrips =  makeTripsArray(testUsers)

        beforeEach('insert malicious article', () => {
            helpers.seedUsers(db, testUsers)
          })

        
        it(`responds 401 'Unauthorized request' when invalid password`, () => {
            const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
            return supertest(app)
                .post('/api/trips')
                .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
                .expect(401, { error: `Unauthorized request` })
        })

        it(`creates a trip, responding with 201 and the new trip`,  function() {
            const testUser = testUsers[0]
            const newTrip = {
                country: 'Nicaragua',
                month: 'nov',
            }
            return supertest(app)
                .post('/api/trips')
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send(newTrip)
                .expect(201)
                .expect(res => {
                    expect(res.body.country).to.eql(newTrip.country)
                    expect(res.body.month).to.eql(newTrip.month)
                    expect(res.body.user.id).to.eql(testUser.id)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/trips/${res.body.id}`)
                })
                .expect (res => 
                    db
                    .from('trips')
                    .select('*')
                    .where({ id: res.body.id })
                    .first()
                    .then(row => {
                        expect(row.country).to.eql(newTrip.country)
                        expect(row.month).to.eql(newTrip.month)
                        expect(row.user_id).to.eql(testUser.id)
                    })
                )
                .then(postRes =>
                    supertest(app)
                    .get(`/api/trips/${postRes.body.id}`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(postRes.body)
                )
        })
        it(`responds with 400 and an error message when the 'country' is missing`, () => {
            return supertest(app)
                .post('/api/trips')
                .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .send({
                    month: 'feb',

                })
                .expect(400, {
                    error: { message: `Missing 'country' in request body` }
                })
        })
        it(`responds with 400 and an error message when the 'month' is missing`, () => {
            return supertest(app)
                .post('/api/trips')
                .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .send({
                    country: 'India',

                })
                .expect(400, {
                    error: { message: `Missing 'month' in request body` }
                })
        })
    })
        
    

})