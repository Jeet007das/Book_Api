const express = require('express');
const router = express.Router();
const bookService = require('./book.service');

// routes
router.get('/',  _getBookLists); //Get all the books details for user buy 
router.get('/:id' , _getBook); //Get single Book
router.post('/addBook', _addNewBook);  //Creating New Book Authorized only by 'ADMIN_USER' 
router.get('/:id',  _getBookListsById); //Get specific book list  whichever created by 'ADMIN_USER'
router.put('/:id',  _updateBookDetails);  //Update Book details authorized by 'ADMIN_USER'
router.delete('/:id',  _deleteBookDetails); //Delete book details authorized by 'ADMIN_USER'


module.exports = router;

function _getBookLists() {
    //here we call service for getting all book details
    console.log("inside controller to call service");
        bookService.getBooksLists()
}