const db = require('../common/db');
const Book = db.Book;
const User = db.User;
const Purchase = db.Purchase;

module.exports = {
   
    _buyBook: async (req, res) => {
        let {user_email, book_id} = req.body;
     try{
            
            const user = await User.find({ email : user_email })
            if(user.length != 0) {
               const purchase = await new Purchase(req.body);
                return await purchase.save();
            }else{
                throw new Error("User not found");
            }
          
        }catch(e){
            console.log("inside log");
            throw new Error(e);
        }
        
    }
}