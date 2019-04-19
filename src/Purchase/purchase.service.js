const db = require('../common/db');
const Book = db.Book;
const User = db.User;
const Purchase = db.Purchase;

var _ = require('lodash');

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
        
    },
    
    _getPurchaseList: async(req, res) => {
        try{
            let bookDetails = [];
            let purchaseList = await Purchase.find({user_email:req.body.user_email});
            for (let purchaseObj of purchaseList) {
                let bookObj = await Book.findById(purchaseObj.book_id);
                let bookObject = _.pick(bookObj, ['_id', 'book_name', 'description','author_name','price', 'stock_count']);
                if(bookObject){
                    await bookDetails.push(bookObject) 
                }
              }
              return bookDetails;
              
        }catch(e){
            console.log("inside log");
            throw new Error(e);
        }
        
    }
}