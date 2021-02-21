 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

//serialize user
passport.serializeUser((user, done) => {
    done(null, user.id); //the error will most likely not happen here, hence the null
});

//deserialize the user
passport.deserializeUser((id, done) =>{
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSercrit,
    callbackURL: '/auth/google/callback',
    proxy = true //helps with the https redirect
},
(accessToken, refreshToken, profile, done)=> {

    //find out if user exist within our mangoDb collection: users
    User.findOne(({ googleID: profile.id}))
    .then((existingUser) => {
        if(existingUser){
            done(null, existingUser);
        }else{
            new User({ googleID: profile.id})
            .save()
            .then(user => done(null, user));
        }
    });

    console.log('access token', accessToken);
    console.log('refresh token', refreshToken);
    console.log('profile', profile);

}));