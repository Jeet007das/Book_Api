const express = require('express');
const router = express.Router();
const purchaseService = require('./purchase.service');
const bookService = require('../Books/book.service');
const auth = require('../middleware/auth');


let _buyBook = async (req, res) => {
    const tokenStatus = await auth(req, res)
    if (!tokenStatus) {
        return res.status(401).send({ message: "You are not logged In, Do logIn first" })
    } else {
        try{
            let purchaseDetails  = await purchaseService._buyBook(req, res);
           console.log("djahgs");
           
            console.log(purchaseDetails);
           

            if(purchaseDetails){
                let updateBookStockCount = await bookService._updateBookStock(req.body.book_id);
                (updateBookStockCount) ? res.status(200).send({message:"Book purchase sucessfully"}) : res.status(404).send({message:"Book Details is not found"})
                console.log("In controller");
            }else{
                res.status(400).send({message:"Purchase Details is not inserting"})
            }
            
        }catch(err){
            console.log(err);
            res.status(400).send({message:"Something went wrong"})
        }
        

    }
}






router.post('/_buyBook', _buyBook);  //User purchase details 


module.exports = router;