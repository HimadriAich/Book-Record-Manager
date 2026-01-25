const express = require("express"); // Importing Express framework

const dotenv = require("dotenv"); // Importing dotenv for environment variable management

const DbConnection = require("./databaseConnection.js"); // Importing database connection module
/********************************************** */
const userRouter =require("./routes/users.js"); // Importing user routes from external file
const booksRouter =require("./routes/books.js"); // Importing book routes from external file
/********************************************** */

dotenv.config(); // Loading environment variables from .env file

const app = express(); // Creating an Express application instance

DbConnection(); // Establishing database connection

const PORT = 8081; // Defining the port number for the server to listen on

app.use(express.json()); // Middleware to parse JSON request bodies

/************ ROUTES ************/
// for building the routes
// for the get request at the root route
// defining a GET route at the root URL "/"

app.get("/", (req, res) => {  // if url ends with / , this route handler will be called
  // Root route handler
  res.status(200).json({
    // Sending a JSON response with status 200  (json format used to pass multiple data)
    message: "Server is up and running :-)",
    data: "hey",
  });
});


// CREATING TWO ROUTE HANDLERS USING EXPRESS ROUTER - IN EXTERNAL FILES

// if any url ends with /users, then use the userRouter for handling those routes
// if any url ends with /books, then use the booksRouter for handling those routes
app.use("/users", userRouter); // Using the user routes for /users endpoint
app.use("/books", booksRouter); // Using the book routes for /books endpoint



//********************************************** */
/* http://localhost:8081/users

/************************************************* */
app.use((req, res) => {    //.use to handle all routes that are not defined above. NOTE:this is placed at the last
  // Handling all other undefined routes
  res.status(404).json({
    // Sending a JSON response with status 404
    message: "This route does not exist",
  });
});

// Starting the server and listening on the defined port
// Listening on the specified port
app.listen(PORT, () => {
  // Starting the server and listening on the defined port
  console.log(`Server is running on port ${PORT}`);
});

// http://localhost:8081/

//note to self: use nodemon for auto-restart of server on file changes
// the command npm run dev is used to run the server with nodemon
//command to run server: nodemon index.js
//command to run server without nodemon: node index.js
