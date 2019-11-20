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

module.exports = {
    makeUsersArray,
    makeArticlesArray,

  }

