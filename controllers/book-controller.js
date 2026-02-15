const {BookModel, UserModel} = require("../models"); // Importing the User and Book models from the models' index.js file
// we are importing the models here because we might need to interact with the database to get or update book and user details

// const issuedBook = require("../dtos/book-dto.js"); // Importing the IssuedBook DTO from the dtos folder, this will be used to transfer the user details along with the issued book details from the database to the client in the response

//IMPORTING DTO(first we create a folder named dtos and create book-dto.js file inside it, then we export the BookDTO class from that file and import it here) to transfer the user details along with the issued book details from the database to the client in the response
const IssuedBook = require("../dtos/book-dto"); // Importing the IssuedBook DTO from the dtos folder, this will be used to transfer the user details along with the issued book details from the database to the client in the response

/********************************************* */
// writing the APIs 
//NOTE: whenever we are interacting with the database, we need to use async-await
exports.getAllBooks = async(req,res) => {    // NOTE: we are using async because we will be using await to interact with the database, and we need to handle the asynchronous nature of the database operations

    const books = await BookModel.find(); // fetching all books from the database using the find() method of the BookModel, this will return an array of all books in the database
    
    console.log(books); // logging the books to the console to check if we are getting the data from the database or not

    if(books.length === 0){ // if there are no books in the database, we will send a response with status 404 and a message
        return res.status(404).json({
            success: false,
            message: "No books found in the database",
        })
    }
    // else, return the books
    res.status(200).json({
        success: true,
        message: "All books fetched successfully",
        data: books,
    })
}

/************************************************************* */

exports.getSingleBookById = async(req,res) => {
    const {id} = req.params; // getting the id from the request parameters

    const book = await BookModel.findById(id); // fetching the book with the given id from the database using the findById() method of the BookModel, this will return the book object if found, else it will return null
// findById() is a mongoose method that is used to find a document by its _id field, it takes the id as an argument and returns the document if found, else it returns null

    if(!book){ // if the book is not found in the database, we will send a response with status 404 and a message
        return res.status(404).json({
            success: false,
            message: `No book found with the id: ${id}`,
        })
    }
    // else, return the book
    res.status(200).json({
        success: true,
        message: `Book with the id: ${id} fetched successfully`,
        data: book
    })
}

/************************************************************* */

exports.getAllIssuedBooks = async(req,res) => {

    const users = await UserModel.find({
        issuedBook : {$exists: true}, // fetching all users from the database who have issued a book,
                                     //  we are using the $exists operator to check if the issuedBook field 
                                     // exists in the user document, this will return an array of users who
                                     //  have issued a book
    }).populate("issuedBook")  // is issuedBook exists, then assign it to the users variable, else it will return an empty array
    // we are using the populate() method to populate the issuedBook field with the actual book details from the BookModel, this will replace the issuedBook field in the user document with the actual book document from the BookModel, this is done because we want to return the book details along with the user details in the response

// DATA TRANSFER OBJECT
// DTO is an object that is used to transfer data between different 
// layers of the application, it is used to encapsulate the data and
//  send it from one layer to another, in this case, we are using a DTO
//  to transfer the user details along with the issued book details from
//  the database to the client in the response


// we are creating a DTO to transfer the user details along with the
//  issued book details from the database to the client in the response,
//  this is done to avoid sending unnecessary data to the client and to 
// structure the data in a way that is easy to understand and use for the client

    const issuedBooks = users.map((each) =>{ return new IssuedBook(each)}); // we are using the map() method to iterate over 
    // the users array and create a new IssuedBook object for each user who has issued a book, this will return an array 
    // of IssuedBook objects, which will contain the user details along with the issued book details, this is done to transfer
    //  the user details along with the issued book details from the database to the client in the response

    if(issuedBooks.length === 0){
        return res.status(404).json({
            // Sending a JSON response with status 404
            success: false,
            message: "No books are issued currently",
        })
        
    }
    //else
    res.status(200).json({
        // Sending a JSON response with status 200
        success: true,
        message: "Users With The Issued Books...",
        data: issuedBooks // Sending the issued books data as response
    });
};

/************************************************************* */

exports.addNewBook = async(req,res) => {

    const {data} = req.body; // getting the data from the request body, this will contain the book details that we want to add to the database

    // we can also directly write const {name, genre, price, publisher} = req.body; instead of const { data } = req.body; and then we can use these variables to create a new book object, but we are using the data variable to keep the code clean and organized, and also to avoid writing multiple variables for each field of the book

    if(!data || Object.keys(data).length === 0){ // if the data is not present in the request body, we will send a response with status 400 and a message
        return res.status(400).json({
            success: false,
            message: "Book details are required to add a new book"
        })
    }

    await BookModel.create(data); // creating a new book in the database using the create() method of the BookModel, this will take the data from the request body and create a new book document in the database

    const allBooks = await BookModel.find(); // fetching all books from the database using the find() method of the BookModel, this will return an array of all books in the database, we are doing this to return the updated list of books after adding a new book 

    res.status(201).json({
        success: true,
        message: "New book added successfully",
        data: allBooks // Sending the updated list of books as response
    });
}

/************************************************************* */

exports.updateBookById = async(req,res) => {

    const {id} = req.params; // getting the id from the request parameters, this will be used to identify which book we want to update in the database
    const {data} = req.body; // getting the data from the request body, this will contain the updated book details that we want to update in the database

    if(!data || Object.keys(data).length === 0){ // if the data is not present in the request body, we will send a response with status 400 and a message
        return res.status(400).json({
            success: false,
            message: "Updated book details are required to update the book",
        })
    }

    const updatedBook = await BookModel.findOneAndUpdate(
        {_id: id,},   
        data, 
        {new: true,}
    ); // updating the book with the given id in the database using the findOneAndUpdate() method of the BookModel, this will take the id from the request parameters and the updated data from the request body, and it will update the book document in the database, this method will return the updated book document if found and updated successfully, else it will return null
    // findOneAndUpdate() is a mongoose method that is used to find a document by its _id field and update it, it takes three arguments, the first argument is the filter object that is used to find the document, in this case we are using an empty object {} as the filter because we are using the id from the request parameters to find the document, the second argument is the updated data that we want to update in the document, and the third argument is an options object, we are using {new: true} as the options to return the updated document after updating it, if we dont use this option, it will return the original document before updating it
    
    if(!updatedBook){ // if the book is not found in the database, we will send a response with status 404 and a message
        return res.status(404).json({
            success: false,
            message: `No book found with the id: ${id} to update`,
        })
    }

    res.status(200).json({
        success: true,
        message: `Book with the id: ${id} updated successfully`,
        data: updatedBook // Sending the updated book details as response
    })
}
//module.exports = {getAllBooks, getSingleBookById, getAllIssuedBooks};   // Exporting the functions so that they can be used in other parts of the application, such as in the routes. We are exporting an object that contains the functions as properties.






