const passport = require('passport');
const router = require('express').Router();

//middleware 함수
router.get(
    '/', //user req toss
    passport.authenticate('google',{ scope: ['profile', 'email']})
);

//데이터 넘겨줌
router.get(
    '/callback', //req + code => google => Real user data
    passport.authenticate('google') //can not get /auth/google/callback
);

module.exports = router;