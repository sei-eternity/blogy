// Passport Package
const passportJWT = require('passport-jwt');
// Passport Options
const jwtOption = require('./passportOptions');

// JSON Web Token Strategy object that we will be using.
const JwtStrategy = passportJWT.Strategy;

// Dummy User for Testing Only!!!
const testUser = { id: 42, username: 'usman', password: '1234' };

// The function where we are going to see if the requesting user
// has a valid JWT token or not. And, to see if it expired.
const strategy = new JwtStrategy(jwtOption, function(jwtPayload, next) {
  console.log('Payload Received!');
  console.log(`User ID: ${jwtPayload.id}`);
  console.log(`Token Expires On: ${jwtPayload.exp}`);

  if (testUser.id === jwtPayload.id) {
    // If ID is in the database, then let's run our original route.
    next(null, testUser);
  } else {
    // If ID does not match, skip our route and return a 401.
    next(null, false);
  }

});

module.exports = strategy;