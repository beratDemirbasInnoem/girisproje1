// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const knex = require('knex');
const knexfile = require('./knexfile');
const knexInstance = knex(knexfile.development);

// Local strategy configuration
passport.use(new LocalStrategy({
  usernameField: 'username', // assuming your form's username field has name="username"
  passwordField: 'password', // assuming your form's password field has name="password"
}, async (username, password, done) => {
  try {
    const user = await knexInstance('users').select().where({ username }).first();

    if (!user) {
      return done(null, false, { message: 'Kullanıcı bulunamadı' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Hatalı şifre' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Kullanıcı oturumu
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await knex('users').where({ id }).first();
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
