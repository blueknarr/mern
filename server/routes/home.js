const router = require('express').Router();

//help, contact page를 home.js에 넣는다.
router.get('/', (req,res) => {
    res.send({happy: 'hacking'});
});

module.exports = router;