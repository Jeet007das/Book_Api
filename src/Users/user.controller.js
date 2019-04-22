const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/login', authenticate);
router.post('/logout',  logout);
router.post('/register',  register);



module.exports = router;

function authenticate(req, res, next) {
   console.log("inside authenticate");
   
    userService.authenticate(req.body)
        .then(user => user ? res.status(201).json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => res.status(401).json({message:"Access denied"}));
}

function register(req, res, next) {
    console.log("Request body");
    
    console.log(req.body);
    
   userService.create(req.body)
        .then(() => res.status(201).json({status:201, message: "User created successfully"}))
        .catch(err => res.status(401).json({message:"Email id already exits"}));
}

function logout(req, res, next) {
    userService.logout(req, res)
        .then(() => res.status(200).json({status:200, message:"Logout done successfully"}))
        .catch((err => {
            res.status(401).json({status:401, message:"Problem in logging out"})
        }));
}

// function getAll(req, res, next) {
//     userService.getAll()
//         .then(users => res.json(users))
//         .catch(err => next(err));
// }

// function getCurrent(req, res, next) {
//     userService.getById(req.user.sub)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function getById(req, res, next) {
//     userService.getById(req.params.id)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function update(req, res, next) {
//     userService.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function _delete(req, res, next) {
//     userService.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }