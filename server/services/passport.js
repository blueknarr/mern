const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');
const mongoose = require('mongoose');
const { User } = require('../models/User');

passport.serializeUser ((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //쿠키가 없다면 passport.use로 가고 
    User.findById(id)
    .then(user => {
        done(null, user)
    })
    .catch(error => console.log(error.message));
});

passport.use(new GoogleStrategy(
    {
        clientID: config.auth.google.clientID,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: "/auth/google/callback",
        proxy:true
    },
    (accessToken, refreshToken, profile, done) => { 
        // console.log(`accessToken => ${accessToken} `);
        // console.log(`refreshToken => ${refreshToken} `);
        // console.log('profile =>', profile);
        // console.log(`done => ${done} `); 
        let user = User.findOne({ googleID: profile.id })
        .then(existingUser => {
            if(existingUser){
                //user 존재
                done(null, existingUser);
            }else{
                //user 없음
                new User({ googleID: profile.id })
                .save()
                .then((newUser) => done(null, newUser))
                .catch(error => console.error(error.message));
            }
        })
        .catch( error => console.log(error.message));
    }
));