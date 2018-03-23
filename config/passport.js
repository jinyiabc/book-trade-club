var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  },
  function(req,email, password, done) {
      console.log(req.body);
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log('Incorrect account');
        return done(null, false, { message: 'Incorrect account.' });
      }
      if (user.password !== password ) {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
	// console.log(user);
	done(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// The fetched object is attached to the request object as req.user ater desrialization.

module.exports  = passport;
