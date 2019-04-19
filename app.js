const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const jwt = require('./src/common/jwt');


//parse data

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// allow cross orgin request
app.use(cors());


//bind jwt token
app.use(jwt())

//bind controllers
app.use('/users', require('./src/Users/user.controller'));
app.use('/books', require('./src/Books/book.controller'));
app.use('/purchase', require('./src/Purchase/purchase.controller'));

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});