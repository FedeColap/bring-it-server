const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Users Endpoints', function() {
  let db

  const { testUsers } = helpers.makeTripsFixtures()
  const testUser = testUsers[0]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/users`, () => {
    context(`User Validation`, () => {
      beforeEach('insert users', () =>
        helpers.seedUsers(
          db,
          testUsers,
        )
      )

      const requiredFields = ['first_name', 'last_name', 'user_name', 'email', 'password', 'repeat_password']

      requiredFields.forEach(field => {
        const registerAttemptBody = {
          first_name: 'test first_name',
          last_name: 'test last_name',
          user_name: 'test user_name',
          email: 'test email',
          password: 'test password',
          repeat_password: 'test password',
        }

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field]

          return supertest(app)
            .post('/api/users')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            })
        })
      })
      it(`responds 400 'Password must be longer than 8 characters' when empty password`, () => {
        const userShortPassword = {
            first_name: 'test first_name',
            last_name: 'test last_name',
            user_name: 'test user_name',
            email: 'test email',
            password: '1234567',
            repeat_password: '1234567',
        }
        return supertest(app)
            .post('/api/users')
            .send(userShortPassword)
            .expect(400, { error: `Password must be longer than 8 characters` })
      })
      it(`responds 400 'Password must be less than 72 characters' when long password`, () => {
        const userLongPassword = {
            first_name: 'test first_name',
            last_name: 'test last_name',
            user_name: 'test user_name',
            email: 'test email',
            password: '*'.repeat(73),
            repeat_password: '*'.repeat(73),
        }
        // console.log(userLongPassword)
        // console.log(userLongPassword.password.length)
        return supertest(app)
            .post('/api/users')
            .send(userLongPassword)
            .expect(400, { error: `Password must be less than 72 characters` })
      })
      it(`responds 400 error when password starts with spaces`, () => {
        const userPasswordStartsSpaces = {
            first_name: 'test first_name',
            last_name: 'test last_name',
            user_name: 'test user_name',
            email: 'test email',
            password: ' 1Aa!2Bb@',
            repeat_password: ' 1Aa!2Bb@',
        }
        return supertest(app)
            .post('/api/users')
            .send(userPasswordStartsSpaces)
            .expect(400, { error: `Password must not start or end with empty spaces` })
      })
      it(`responds 400 error when password ends with spaces`, () => {
        const userPasswordEndsSpaces = {
            first_name: 'test first_name',
            last_name: 'test last_name',
            user_name: 'test user_name',
            email: 'test email',
            password: '1Aa!2Bb@ ',
            repeat_password: '1Aa!2Bb@ ',
        }
        return supertest(app)
            .post('/api/users')
            .send(userPasswordEndsSpaces)
            .expect(400, { error: `Password must not start or end with empty spaces` })
      })
      it(`responds 400 error when password isn't complex enough`, () => {
        const userPasswordNotComplex = {
            first_name: 'test first_name',
            last_name: 'test last_name',
            user_name: 'test user_name',
            email: 'test email',
            password: '11AAaabb',
            repeat_password: '11AAaabb',
        }
        return supertest(app)
            .post('/api/users')
            .send(userPasswordNotComplex)
            .expect(400, { error: `Password must contain 1 upper case, lower case, number and special character` })
      })
      it(`responds 400 'User name already taken' when user_name isn't unique`, () => {
        
        const duplicateUser = {
            first_name: 'test first_name',
            last_name: 'test last_name',
            user_name: testUser.user_name,
            email: 'test email',
            password: '11AAaa!!',
            repeat_password: '11AAaa!!',
        }
        return supertest(app)
            .post('/api/users')
            .send(duplicateUser)
            .expect(400, { error: `Username already taken` })
      })
    })

    context(`Happy path`, () => {
        it(`responds 201, serialized user, storing bcryped password`, () => {
            const newUser = {
                first_name: 'test first_name',
                last_name: 'test last_name',
                user_name: 'test user_name',
                email: 'test email',
                password: '11AAaa!!',
                repeat_password: '11AAaa!!',
            }
            return supertest(app)
                    .post('/api/users')
                    .send(newUser)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body.first_name).to.eql(newUser.first_name)
                        expect(res.body.last_name).to.eql(newUser.last_name)
                        expect(res.body.user_name).to.eql(newUser.user_name)
                        expect(res.body.email).to.eql(newUser.email)
                        expect(res.body).to.not.have.property('password')
                        expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)                
                    })
                    .expect(res =>
                        db
                        .from('searchers')
                        .select('*')
                        .where({ id: res.body.id })
                        .first()
                        .then(row => {
                            expect(row.first_name).to.eql(newUser.first_name)
                            expect(row.last_name).to.eql(newUser.last_name)
                            expect(row.user_name).to.eql(newUser.user_name)
                            expect(row.email).to.eql(newUser.email)
                            return bcrypt.compare(newUser.password, row.password)
                        })
                        .then(compareMatch => {
                            expect(compareMatch).to.be.true
                        })
                    )
        })
    })
  })
})