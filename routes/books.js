const express = require("express");
const {books} = require("../data/books.json"); // Importing books data from JSON file

const {users} = require("../data/users.json"); // Importing users data from JSON file
// we are importing users data here because we might need to check which books are issued to which users

const router = express.Router(); // Creating a new router instance for book routes, this is done because we are creating routes in this file
// Vimp: we use express.Router() to create a new router object that can handle routes separately from the main app

/************************************ */
/*
* Route: /books                 //route to get all books
* Method: GET             //HTTP GET method to retrieve data 
* Description: Get all books     //fetching all books from the data source
* Access: Public         // no authentication needed
* Parameters: None    //no parameters needed to get all books
 */

router.get("/", (req, res) => {   // if url ends with /books , this route handler will be called
  // Route handler for GET /books
  res.status(200).json({        // Sending a JSON response with status 200
    success: true,
    message: "Got all books",
    data: books // Sending the books data as response
  });
});

/************************************************** */

/*
* Route: /books/:id                 //route to get a specific book by ID
* Method: GET             //HTTP GET method to retrieve data 
* Description: Get a specific book by ID     //fetching a specific book from the data source
* Access: Public         // no authentication needed
* Parameters: id    //parameter needed to get a specific book
 */

router.get("/:id", (req, res) => {   // if url ends with /books/:id , this route handler will be called
  // Route handler for GET /books/:id
  const { id } = req.params; // Extracting the book ID from the request parameters
  const book = books.find((each) => each.id === id); // Finding the book with the matching ID
  
  if (!book) {
    // If no book is found with the given ID
    return res.status(404).json({
        // Sending a JSON response with status 404
        success: false,
        message: `Book with id ${id} not found`,
    });
  }

  //else
  return res.status(200).json({
    // If book is found, sending a JSON response with status 200
    success: true,        // Indicating the request was successful
    message: "Book found by their id",
    data: book,          // Sending the found book data as response
  });

});
/************************************************** */
/****VIMP: GET ALL ISSUED BOOKS ***** */
/*
* Route: /books/issued                 //route to get all issued books
* Method: GET             //HTTP GET method to retrieve data 
* Description: Get all issued books     //fetching all issued books from the data source
* Access: Public         // no authentication needed
* Parameters: none   //parameter not needed to get all issued books
 */

router.get("/issued/by-user", (req, res) => {   // if url ends with /books/issued/by-user , this route handler will be called
  // Route handler for GET /books/issued
  // Filtering the books array to get only the issued books
  const usersWithTheIssuedBook = users.filter((each) => {   //filter is used to filter out the users(multiple,not single  for single we use find method) who have issued books
    if(each.issuedBook) return each;       // returning only those users(their id) who have an issuedBook property

  });

  const issuedBooks = [];    // Array to store the issued books user-details

    usersWithTheIssuedBook.forEach((each) => {
        const book = books.find((book) => (book.id === each.issuedBook)); // Finding the book details from books array using the issuedBook ID
        book.issuedBy = each.name; // Adding the name of the user who issued the book
        book.issuedDate = each.issuedDate; // Adding the issued date
        book.returnDate = each.returnDate; // Adding the return date

        issuedBooks.push(book); // Adding the book to the issuedBooks array
    });

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
});

/************************************************** */
module.exports = router; // Exporting the router to be used in other files
// the above line is written to export the router object so that it can be imported and used in other files,
//  such as the main application file (index.js) where all routes are consolidated and the server is set up.