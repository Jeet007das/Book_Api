const config = require('../../config.json')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../common/db');
const User = db.User;

module.exports = {
    authenticate,
    logout,
    // getAll,
    // getById,
    create,
    // update,
    // delete: _delete
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, token, ...userWithoutPassword } = user.toObject();
        const web_token = jwt.sign({ sub: user.id }, config.secret);
        const updateUser = await User.findById(user.id);
        (user.token).push(web_token)
        Object.assign(updateUser, user);
        updateUser.save();
        return {
            ...userWithoutPassword,
            web_token
        };
    }
    
}

// async function getAll() {
//     return await User.find().select('-hash');
// }

async function getById(id){
    console.log("inside get service" +id);
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    console.log("inside service");
    
    if (await User.findOne({ email: userParam.email })) {
        throw new Error("Email is already taken");
    }
    if(!userParam.role){
       userParam.role="ROLE_USER"; 
    }
    console.log(userParam);
    
    const user = await new User(userParam);
   
    // becrypt password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 8);
    }

    // save user
    await user.save();
    console.log("here user saved");
    
}


async function logout(req,res){
    

}

// async function update(id, userParam) {
//     const user = await User.findById(id);

//     // validate
//     if (!user) throw 'User not found';
//     if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
// }

// async function _delete(id) {
//     await User.findByIdAndRemove(id);
// }