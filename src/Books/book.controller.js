const express = require('express');
const router = express.Router();
const bookService = require('./book.service');
const auth = require('../middleware/auth');



let _getBooksLists = async(req, res, next) => {
    try{
        let bookLists = []
        bookLists = await bookService._getBooksLists();
        (bookLists.length > 0) ?  res.status(200).send({bookLists}) : res.status(404).send({message:"Book Details is not found"})
    }catch(err){
        console.log(err);
        res.status(400).send({message:"Something went wrong"})
    }
 
 
}

let _addNewBook = async(req,res) => {
   const tokenStatus = await auth(req, res)
    if(!tokenStatus){
       return res.status(401).send({message:"You are not logged In, Do logIn first"})
    }else{
        if(tokenStatus.role[0] !== 'ROLE_ADMIN') {
            return res.status(401).send({message:"You are not authorized user"})
        }else{
            try{    
                let book = await bookService._addNewBook(req, res);
                (book) ?  res.status(201).send({message:"Book added successfully"}) : res.status(400).send({message:"Book is not added, please try again"})
            }catch(e){
                console.log(e);
                
            }
            
        }
    }
}

// let _getBook = async(req, res) => {
//     console.log("_getBook");
    
//     try{
//         console.log(req.id);
//         let bookDetails = await bookService._getBook(req.id);
//         bookDetails ?  res.status(201).send({message:"Book details Found"}) : res.status(400).send({message:"Book details is not found"})
//     }catch(err){
//         console.log(err);
//         res.status(400).send({message:"Something went wrong to fetch single book"})
//     }
// }

let _getBookListsById = async(req, res) => {
    const tokenStatus = await auth(req, res)
    if(!tokenStatus){
       return res.status(401).send({message:"You are not logged In, Do logIn first"})
    }else{
        if(tokenStatus.role[0] !== 'ROLE_ADMIN') {
            return res.status(401).send({message:"You are not authorized user"})
        }else{
            try{
                let bookList = [];
                bookList = await bookService._getBookListsById(req,res);
                (bookList) ? res.status(200).send({bookList}) : res.status(404).send({message:"Book Details is not found"})
                
            }catch(err){
                console.log(err);
                res.status(400).send({message:"Something went wrong"})
            }
         }
    }
}

let _updateBookDetails = async(req,res) =>{
     const tokenStatus = await auth(req, res)
    if (!tokenStatus) {
        return res.status(401).send({ message: "You are not logged In, Do logIn first" })
    } else {
        if (tokenStatus.role[0] !== 'ROLE_ADMIN') {
            return res.status(401).send({ message: "You are not authorized user" })
        } else {
            try{
                const updateBook = await bookService._updateBookDetails(req,res);
                (updateBook) ? res.status(200).send({updateBook, message:"Update sucessfully"}) : res.status(404).send({message:"Book Details is not found"})
            }catch(err){
                console.log(err);
                res.status(400).send({message:"Something went wrong"})
            }
        }
    }
}


let _deleteBookDetails = async(req, res) =>{
    console.log("in delete controller");
    
    const tokenStatus = await auth(req, res)
    if (!tokenStatus) {
        return res.status(401).send({ message: "You are not logged In, Do logIn first" })
    } else {
        if (tokenStatus.role[0] !== 'ROLE_ADMIN') {
            return res.status(401).send({ message: "You are not authorized user" })
        } else {
            try{
                let deleteBook = await bookService._deleteBookDetails(req,res);
                (deleteBook) ? res.status(200).send({message:"Delete sucessfully"}) : res.status(404).send({message:"Book Details is not found"})
            }catch(err){
                console.log(err);
                res.status(400).send({message:"Something went wrong"})
            }
        }
    }
}



router.get('/_getBooksLists',  _getBooksLists); //Get all the books details for user buy 
//router.get('/:id' , _getBook); //Get single Book
router.post('/_addNewBook', _addNewBook);  //Creating New Book Authorized only by 'ADMIN_USER' 
router.post('/_getBookListsById',  _getBookListsById); //Get specific book list  whichever created by 'ADMIN_USER'
router.post('/_updateBookDetails',  _updateBookDetails);  //Update Book details authorized by 'ADMIN_USER'
router.post('/_deleteBookDetails',  _deleteBookDetails); //Delete book details authorized by 'ADMIN_USER'


module.exports = router;

