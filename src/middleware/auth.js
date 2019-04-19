const jwt = require('jsonwebtoken')
const User = require('../Users/user.model')
const config = require('../../config.json')

const auth = async (req, res) => {
        try {
            console.log(req.body);
            
            const token = req.headers['x-access-token'];
            const decoded = jwt.verify(token, config.secret)
            const user = await User.findOne({ _id : decoded.sub , token : token })  
            console.log(user._id);
            if(!user ) {
                res.status(401).send({error:"Unauthorized user"})
                throw new Error("Unauthorized user, please login and try again")
            }

            return user

         }catch(e) {
            res.status(401).send({error : 'Authentication Failed'})
        }
}

module.exports = auth