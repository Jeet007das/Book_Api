
const config = require('../../config.json')
const userService = require('../Users/user.service');
const dummyuser = async (req, res) => {
        try {
            let user = {
                name:"Rahul",
                email:"rahul@moodcafe.in",
                password:"text",
                role:"[ROLE_ADMIN]"
            }
            let response = await userService.create(user,res);
         }catch(e) {
            console.log("Dummy User already creted");
            
        }
}

module.exports = dummyuser