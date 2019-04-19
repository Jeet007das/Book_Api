const db = require('../common/db');
const Book = db.Book;
const User = db.User;

module.exports = {
   //getBooksLists,
  
    _addNewBook: async (req, res ) => {
        const bookDetails = req.body;
        if (!bookDetails) {
             throw new Error("Book details is not found")
        } else {
             try{
                const user = await User.findById(bookDetails.seller_id);
                if (!user) {
                    throw new Error("You are not a valid user")
                } else {
                    const book = new Book(req.body);
                    return await book.save();
                }
            }catch(e){
                throw new Error("Seller id is not valid"+e)
            }
            
        
        }
    },

    _getBooksLists: async () => {
       try{
            const bookLists = await Book.find({});
            return bookLists
        }catch(e){
            throw new Error
        }
    },

    _getBook: async(id) =>{
        console.log("in service to fetch single book"+id.seller_id);
        try{
            
            const user = User.findById(id.seller_id)
            console.log(user);

            if(user && user.role === 'ROLE_ADMIN'){
                 const bookDetails = await Book.findBy({seller_id: id.seller_id});
                 console.log(bookDetails);
                return bookDetails
            }
           
        }catch(e){
            throw new Error("Something went wrong")
        }
    },

    _getBookListsById: async (req,res) => {
        console.log( req.body.seller_id);
        try {
            const user = await User.findById(req.body.seller_id);
            if (user) {
                const bookDetails = await Book.find({ seller_id: req.body.seller_id });
                return bookDetails
            }
         } catch (e) {
            throw new Error("Something went wrong, please try again")
        }
    },

    _updateBookDetails:async(req,res) => {
        console.log(res.body);
        let bookDetails = res.body;
        try{
            console.log("in try block");
            
            if(bookDetails._id !== null || bookDetails._id !== 'undefined'){
                console.log("here we update book");
                
            }else{
                throw new Error("Book Details is not found")
            }
        }catch(e){
            throw new Error("Something went wrong, please try again")
        }
        
    }


};



// async function create(userParam) {

//     if (await User.findOne({ email: userParam.email })) {
//         throw new Error("Email is already taken") ;
//     }
    
//     const user = new User(userParam);

//     // becrypt password
//     if (userParam.password) {
//         user.password = bcrypt.hashSync(userParam.password, 8);
//     }

//     // save user
//     await user.save();
// }