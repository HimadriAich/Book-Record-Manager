const {UserModel, BookModel} = require("../models/index"); // Importing the User and Book models from the models' index.js file
// we are importing the models here because we might need to interact with the database to get or update book and user details

// writing the APIs 
//NOTE: whenever we are interacting with the database, we need to use async-await
exports.getAllBooks = async(req,res) => {    // NOTE: we are using async because we will be using await to interact with the database, and we need to handle the asynchronous nature of the database operations

    const books = await BookModel.find(); // fetching all books from the database using the find() method of the BookModel, this will return an array of all books in the database

    if(books.length === 0){ // if there are no books in the database, we will send a response with status 404 and a message
        return res.status(404).json({
            success: false,
            message: "No books found in the database",
        });
    }
    // else, return the books
    return res.status(200).json({
        success: true,
        message: "All books fetched successfully",
        data: books,
    });
};

/************************************************************* */

exports.getSingleBookById = async(req,res) => {
    const {id} = req.params; // getting the id from the request parameters

    const book = await BookModel.findById(id); // fetching the book with the given id from the database using the findById() method of the BookModel, this will return the book object if found, else it will return null
// findById() is a mongoose method that is used to find a document by its _id field, it takes the id as an argument and returns the document if found, else it returns null

    if(!book){ // if the book is not found in the database, we will send a response with status 404 and a message
        return res.status(404).json({
            success: false,
            message: `No book found with the id: ${id}`,
        });
    }
    // else, return the book
    return res.status(200).json({
        success: true,
        message: `Book with the id: ${id} fetched successfully`,
        data: book,
    });
};

/************************************************************* */

exports.getAllIssuedBooks = async(req,res) => {

    const users = await UserModel.find({
        issuedBook : {$exists: true} // fetching all users from the database who have issued a book,
                                     //  we are using the $exists operator to check if the issuedBook field 
                                     // exists in the user document, this will return an array of users who
                                     //  have issued a book
    }).populate("issuedBook"); // is issuedBook exists, then assign it to the users variable, else it will return an empty array
    // we are using the populate() method to populate the issuedBook field with the actual book details from the BookModel, this will replace the issuedBook field in the user document with the actual book document from the BookModel, this is done because we want to return the book details along with the user details in the response

// DATA TRANSFER OBJECT
    if(issuedBooks.length === 0){
        return res.status(404).json({
            // Sending a JSON response with status 404
            success: false,
            message: "No books are issued currently",
        });
        
    }
    //else
    return res.status(200).json({
        // Sending a JSON response with status 200
        success: true,
        message: "Users With The Issued Books...",
        data: issuedBooks, // Sending the issued books data as response
    });
};

//module.exports = {getAllBooks, getSingleBookById, getAllIssuedBooks};   // Exporting the functions so that they can be used in other parts of the application, such as in the routes. We are exporting an object that contains the functions as properties.






