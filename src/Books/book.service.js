const db = require('../common/db');
const Book = db.Book;
const User = db.User;

module.exports = {
   
     _addNewBook: async (req, res) => {
        const bookDetails = req.body;
        if (!bookDetails) {
            throw new Error("Book details is not found")
        } else {
            try {
                const user = await User.findById(bookDetails.seller_id);
                if (!user) {
                    throw new Error("You are not a valid user")
                } else {
                    const book = new Book(req.body);
                    return await book.save();
                }
            } catch (e) {
                throw new Error("Seller id is not valid" + e)
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

    // _getBook: async (id) => {
    //     try {

    //         const user = User.findById(id.seller_id)
    //         if (user && user.role === 'ROLE_ADMIN') {
    //             const bookDetails = await Book.findBy({ seller_id: id.seller_id });
    //             return bookDetails
    //         }

    //     } catch (e) {
    //         throw new Error("Something went wrong")
    //     }
    // },

    _getBookListsById: async (req, res) => {
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

    _updateBookDetails: async (req, res) => {

        let bookDetails = req.body;
        let { book_name, description, author_name, price, stock_count, seller_id, book_category } = bookDetails.bookObj;
        if (bookDetails._id !== null || bookDetails._id !== 'undefined') {
            try {
                let updateBook = await Book.findOneAndUpdate({ _id: bookDetails._id },
                    { "$set": { "book_name": book_name, "description": description, "author_name": author_name, "price": price, "stock_count": stock_count, "seller_id": seller_id, "book_category": book_category } });
                return updateBook
            } catch (e) {
                throw new Error(e)
            }
        } else {
            throw new Error("Book not found")
        }

    },

    _deleteBookDetails: async(req, res) =>{
        try{
            let deleteBook = await Book.findByIdAndDelete({_id: req.body.id});
            return deleteBook
        }catch(e){
            throw new Error(e)
        }
        
    },

    _updateBookStock:async(book_id) =>{
        try{
            let updateBook = await Book.findOneAndUpdate({ _id: book_id },
                { $inc: {stock_count: -1} });
                
         return updateBook
        }catch(e){
            throw new Error(e)
        }
        
    }


};

