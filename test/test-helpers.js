const bcrypt = require('bcryptjs')

function makeUsersArray() {
    return [
      {
        id: 1,
        first_name: 'Kaede',
        last_name: 'Rukawa',
        user_name: 'SuperRookie',
        email: 'kaedeRukawa@shohoku.jp',
        password: 'secretPas123!',
      },
      {
        id: 2,
        first_name: 'Hanamichi',
        last_name: 'Sakuragi',
        user_name: 'Tenshou',
        email: 'hanamichin@shohoku.jp',
        password: 'odioRukawa123!',
      },
      {
        id: 3,
        first_name: 'Takenori',
        last_name: 'Akagi',
        user_name: 'Gorilla',
        email: 'captain@shohoku.jp',
        password: 'totheFinals123!',
      },
      {
        id: 4,
        first_name: 'Hisashi',
        last_name: 'Mitsui',
        user_name: 'Teppista',
        email: 'shooter@shohoku.jp',
        password: 'lastYear123!',
      },
      {
        id: 5,
        first_name: 'Ryota',
        last_name: 'Miyagi',
        user_name: 'Tappetto',
        email: 'shorter@shohoku.jp',
        password: 'gamePlayer123!',
      },
    ]
}

function makeTripsArray(users) {
    return [
        {
            id: 1,
            country: "France", 
            month: "jun",
            user_id: users[0].id,
        },
        {
            id: 2,
            country: "Italy", 
            month: "jan",
            user_id: users[1].id,
        },
        {
           id: 3,
           country : "Austria", 
           month : "feb",
           user_id: users[2].id,
        },
        {
            id: 4,
            country : "Holland", 
            month : "mar",
            user_id: users[3].id,
         },
         {
            id: 5,
            country : "Spain", 
            month : "apr",
            user_id: users[4].id,
         },
    ]
}
function makeTripsFixtures() {
  const testUsers = makeUsersArray()
  const testTrips =  makeTripsArray(testUsers)
  return { testUsers, testTrips }
}

function makeExpectedTrips(users, tripId) {
  const expectedTrips = trips
    .filter(trip => trip.id === tripId)

  return expectedTrips.map(trip => {
    const tripUser = users.find(user => user.id === trip.user_id)
    return {
      id: trip.id,
      country: trip.country,
      month: trip.month,
      user: {
        id: tripUser.id,
        user_name: tripUser.user_name,
        email: tripUser.email,
      }
    }
  })
}


function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        trips,
        searchers
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE trips_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE searchers_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('trips_id_seq', 0)`),
        trx.raw(`SELECT setval('searchers_id_seq', 0)`),
      ])
    )
  )
}

  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('searchers').insert(preppedUsers)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('searchers_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }

function seedTripsTables(db, users, trips) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('trips').insert(trips)
    // update the auto sequence to match the forced id values
    await trx.raw(
        `SELECT setval('trips_id_seq', ?)`,
        [trips[trips.length - 1].id],
    )
  })
}

function makeAuthHeader(user) {
  const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
  return `Basic ${token}`
}


module.exports = {
    makeUsersArray,
    makeTripsArray,
    makeTripsFixtures,
    makeExpectedTrips,
    cleanTables,
    seedUsers,
    seedTripsTables,
    makeAuthHeader
  }

