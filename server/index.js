
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');

const app = express();

passport.use(new GoogleStrategy(
    {
        clientID: config.auth.google.clientID,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => { 
        console.log(`accessToken => ${accessToken} `);
        console.log(`refreshToken => ${refreshToken} `);
        console.log('profile =>', profile);
        console.log(`done => ${done} `); 
    }
));

app.get('/', (req,res) => {
    res.send({happy: 'hacking'});
});

//middleware 함수
app.get(
    '/auth/google', //user req toss
    passport.authenticate('google',{ scope: ['profile', 'email']})
);

//데이터 넘겨줌
app.get(
    '/auth/google/callback', //req + code => google => Real user data
    passport.authenticate('google') //can not get /auth/google/callback
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listen on ${PORT}`));