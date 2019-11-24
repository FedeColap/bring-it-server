const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const { makeUsersArray, makeTripsArray } = require('./test-helpers')

describe.only('Protected endpoints', function() {
    let db
  
    const testUsers = makeUsersArray();
    const testTrips =  makeTripsArray(testUsers)
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
  
    before('clean the table', () => db.raw('TRUNCATE trips, searchers RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE trips, searchers RESTART IDENTITY CASCADE'))
  
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
        name: 'GET /api/trips',
        path: '/api/trips/1',
        method: supertest(app).get,
      },
      {
        name: 'POST /api/trips',
        path: '/api/trips',
        method: supertest(app).post,
      },
    ]
  
    protectedEndpoints.forEach(endpoint => {
      describe(endpoint.name, () => {
        it(`responds 401 'Missing bearer token' when no bearer token`, () => {
          return endpoint.method(endpoint.path)
            .expect(401, { error: `Missing bearer token` })
        })
  
        it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
          const validUser = testUsers[0]
          const invalidSecret = 'bad-secret'
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
            .expect(401, { error: `Unauthorized request` })
        })
  
        it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
          const invalidUser = { user_name: 'user-not-existy', id: 1 }
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(invalidUser))
            .expect(401, { error: `Unauthorized request` })
        })
  
      })
    })
  })