// index.js file to export the models

const UserModel = require('./user-models'); // importing the user model
const BookModel = require('./book-models'); // importing the book model


module.exports = {
    UserModel, // exporting the user model 
    BookModel, // exporting the book model
};

// now we can directly call this index.js file in our controllers to
//  access both the user and book models without having to import 
// them separately. For example, in the user controller, we can do:
// const { User } = require('../models'); // this will give us access to the User model
// const { Book } = require('../models'); // this will give us access to the Book model