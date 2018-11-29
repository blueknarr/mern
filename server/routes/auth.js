const passport = require('passport');
const router = require('express').Router();

//middleware 함수
router.get(
    '/', //user req toss
    passport.authenticate('google',{ scope: ['profile', 'email']})
);

//데이터 넘겨줌
router.get(
    '/callback', 
    passport.authenticate('google'), //can not get /auth/google/callback
    (req, res) => {
        res.redirect('/dashboard');
    }
);

module.exports = router;