const expressJwt = require('express-jwt');
const config = require('../../config.json')
const userService = require('../Users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/users/login',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    console.log(user);
    

    if (!user) {
        return done(null, true);
    }

    done();
};