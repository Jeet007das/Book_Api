const express = require('express');
const router = express.Router()

let User = require('../model/UserSchema')

router.get('/register', (req, res) =>{
    res.render('register');
});

module.exports = router;