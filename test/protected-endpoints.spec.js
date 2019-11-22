const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const { makeUsersArray, makeTripsArray } = require('./test-helpers')

describe('Protected endpoints', function() {
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
        it(`responds 401 'Missing basic token' when no basic token`, () => {
          return endpoint.method(endpoint.path)
            .expect(401, { error: `Missing basic token` })
        })
  
        it(`responds 401 'Unauthorized request' when no credentials in token`, () => {
          const userNoCreds = { user_name: '', password: '' }
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(userNoCreds))
            .expect(401, { error: `Unauthorized request` })
        })
  
        it(`responds 401 'Unauthorized request' when invalid user`, () => {
          const userInvalidCreds = { user_name: 'user-not', password: 'existy' }
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
            .expect(401, { error: `Unauthorized request` })
        })
  
        it(`responds 401 'Unauthorized request' when invalid password`, () => {
          const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
            .expect(401, { error: `Unauthorized request` })
        })
      })
    })
  })