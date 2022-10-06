const cookieSession = require('cookie-session');

module.exports = cookieSession({
    secret: process.env.SESSION_SECRET, // please set this in your .env file
    key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
    resave: 'false',
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // Set to 7 days - 1000ms * 60 seconds * 60 minutes * 24 hours * 7 days
    secure: false,
});