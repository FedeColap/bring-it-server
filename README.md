# Bring it (Please) Server

Back-end application for storing and retrieving Information about the users and their next trips abroad. 
This Repo works with the Front-end Repo [bring-it-client](https://github.com/FedeColap/bring-it-client)

### Link
## [Live App Demo](https://fedecolap-bring-it-app.now.sh)
### __Demo-User__ : Username: __Eric__ , Password: __G0d0dpassw0rd24!__
___

#### This App has been built with: 

* React
* Node.js 
 * Express server, JWT and bcrypt.js for authentication
 * Morgan and Winston for logging
* PostgreSQL database
 * Knex.js for query building
 * Postgrator for versioning
* Testing on Mocha framework using Chai and Supertest
___

### API Documentation
While there are pages that are visible to everyone (like the Homepage, or the *More Info* page), 
the majority of the endpoints require previous authentication. The app works with "application/json" body for post requests, and returns JSON data.

#### Create Account:
`POST /api/users`

Post `{ first_name, last_name, user_name, email, password, repeat_password }` object to create a new user entry in the table
The database will reject the entry if a `user_name` has already been taken.
The password must be 8 - 72 character and must contain at least one lowercase letter, uppercase letter, number, and special character

#### Login:
`POST /api/auth/login`

Post `{ user_name, password }` object to log in to the application
Successful post request will return JWT containing user_id payload

#### Search for Users traveling abroad
`GET /api/trips`

Protected endpoint: header must include Authorization bearing a valid JWT
Successful get request will return an array of JSON objects containing `{user_name, country, month, email}` of the people traveling abroad in the
specified Country and Month, otherwise a warning of "No users available" will appear

#### Add a New Trip
`POST /api/trips`

Protected endpoint: header must include Authorization bearing a valid JWT
`user_id` is derived from JWT, and all other `user` infos are then combined with the database storing the `trips`
Successful post request will perform the `POST` request and redirect to the *Search Page*, where the added trip will be immediately available.
