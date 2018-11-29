const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const mongoose = require("mongoose");
const { User } = require("../models/User");
const config = require('config'); // 추가

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.auth.google.clientID, // 수정
      clientSecret: config.auth.google.clientSecret, // 수정
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id })
      
      if(existingUser) done(null, existingUser); //user 있음 
      else { // user 없음
        const newUser = await new User({ googleID: profile.id }).save();
        done(null, newUser);
      }
      // console.log(`accessToken => ${accessToken} `);
        // console.log(`refreshToken => ${refreshToken} `);
        // console.log('profile =>', profile);
        // console.log(`done => ${done} `); 

      // let user = User.findOne({ googleID: profile.id })
      //   .then(existingUser => {
      //     if (existingUser) {
      //       // User exists
      //       done(null, existingUser);
      //     } else {
      //       // no such user
      //       new User({ googleID: profile.id })
      //         .save()
      //         .then(newUser => done(null, newUser))
      //         .catch(error => done(error));
      //     }
      //   })
      //   .catch(error => {
      //     done(error);
      //   });
    }
  )
);