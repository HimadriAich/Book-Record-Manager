const express = require("express");
const {books} = require("../data/books.json"); // Importing books data from JSON file

const {users} = require("../data/users.json"); // Importing users data from JSON file
// we are importing users data here because we might need to check which books are issued to which users

const router = express.Router(); // Creating a new router instance for book routes, this is done because we are creating routes in this file
// Vimp: we use express.Router() to create a new router object that can handle routes separately from the main app

/************************************ */
/*
* Route: /                 //route to get all books
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
* Route: /:id                 //route to get a specific book by ID
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
* Route: /issued/by-user                 //route to get all issued books
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
/*
* Route: /                 //route to create a new book
* Method: POST             //HTTP POST method to create data (new book) 
* Description: Create a new book     //creating a new book in the data source
* Access: Public         // no authentication needed
* Parameters: none   //parameter not needed to create a new book
* Data : id, name, author, genre, price, publisher  //data needed to create a new book 
 */

router.post("/", (req, res) => {   // if url ends with /books , this route handler will be called
  // Route handler for POST /books
  const { data } = req.body || {};   // Extracting the book data from the request body
  //NOTE: for requesting more than one parameter, we use req.body
  //req.body simply means that we are accessing the body of the request where the book details are sent in JSON format
  // for one parameter in url, we use req.params


  if(!data) {         //if no data is provided in the request body
    return res.status(400).json({
        // Sending a JSON response with status 400
        success: false,
        message: "Book data is required",
    });
  }
   
  const book = books.find((each) => each.id === data.id); // Checking if a book with the same ID already exists

  if(book){
        return res.status(400).json({    // If book with the same ID exists, sending a JSON response with status 400
            success: false,
            message: `Book with this id already exists`
        })
  }
  //else, create the new book
  const allBooks = {...books, data}; // Adding the new book data to the existing books data using spread operator
  return res.status(201).json({
    // Sending a JSON response with status 201
    success: true,
    message: "New book created successfully",
    data: allBooks // Sending the updated books data as response
  })
});

/*********VIMP: UPDATE BOOK BY ID***************************************** */

/*
* Route: /:id                 //route to update a book by id
* Method: PUT             //HTTP PUT method to update data (new book) 
* Description: Update a book     //updating a book in the data source
* Access: Public         // no authentication needed
* Parameters: id   //parameter id needed to update a book
* Data : id, name, author, genre, price, publisher  //data needed to update a new book 
 */

router.put("/updateBook/:id", (req,res) => {   // if url ends with /books/:id , this route handler will be called
  // Route handler for PUT /books/:id
  const { id } = req.params; // Extracting the book ID from the request parameters
  const { data } = req.body;   // Extracting the book data from the request body

  //data (or data.id i.e. the id) here basically represents the one which we are writing in the body of the request to update the book details
  const book = books.find((each) => each.id ===id); // Finding the book with the matching ID, to see if that book even exists

  if(!book){
        return res.status(404).json({    // If book with the given ID does not exist, sending a JSON response with status 404
            success: false,
            message: `Book with id ${id} not found`
        })
  }
    //else, update the book
    const updateData = books.map((each) => {
        if(each.id === id){
            return {
                ...each,    // Retaining existing book properties (each represents the current book in the iteration)
                ...data   // Merging the existing book data with the new data using spread operator (data represents the new book data to be updated)
            };
        }
        //else
        return each; // Returning the unchanged book data if no update done
    });

    return res.status(200).json({
        // Sending a JSON response with status 200
        success: true,
        message: "Book updated successfully",
        data: updateData // Sending the updated books data as response
    });
});
/************************************************** */

module.exports = router; // Exporting the router to be used in other files
// the above line is written to export the router object so that it can be imported and used in other files,
//  such as the main application file (index.js) where all routes are consolidated and the server is set up.