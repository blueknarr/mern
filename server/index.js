const passport = require('passport');
const express = require('express');
const auth = require('./routes/auth');
const home = require('./routes/home');
const users = require('./routes/Users');
const app = express('/auth/google',auth);
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const config = require('config');

//항상 코드를 사용하고 싶다
require('./services/passport');

mongoose.connect(config.DB.mongoURI,{ useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error.message));

app.use(
    cookieSession({ //req.session 
        name: 'MERN cookie',
        //1 month
        maxAge: (30 * 24 * 60 * 60 * 1000),
        keys: [config.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session()); //req.user == <USER INSTANCE>

//Routes
app.use('/auth/google',auth);
app.use(home);
app.use('/api/users',users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listen on ${PORT}`));



