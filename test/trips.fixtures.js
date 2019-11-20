function makeTripsArray() {
    return [
        {
            id: 1,
            country: "France", 
            month: "jun",
            user_id: 1
        },
        {
            id: 2,
            country: "Italy", 
            month: "jan",
            user_id: 2
        },
        {
           id: 3,
           country : "Austria", 
           month : "jan",
           user_id: 1
        },
    ]
}

module.exports ={
    makeTripsArray, 
}