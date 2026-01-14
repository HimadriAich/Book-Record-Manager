const express = require("express"); // Importing Express framework
const {users} = require("./data/users.json"); // Importing users data from JSON file

const app = express(); // Creating an Express application instance

const PORT = 8081; // Defining the port number for the server to listen on

app.use(express.json()); // Middleware to parse JSON request bodies

/*
* Route: /users                 //route to get all users
* Method: GET             //HTTP GET method to retrieve data 
* Description: Get all users     //fetching all users from the data source
* Access: Public         // no authentication needed
* Parameters: None    //no parameters needed to get all users
 */



// for building the routes
// for the get request at the root route
// defining a GET route at the root URL "/"
app.get("/", (req, res) => {
  // Root route handler
  res.status(200).json({
    // Sending a JSON response with status 200  (json format used to pass multiple data)
    message: "Server is up and running :-)",
    data: "hey",
  });
});
//********************************************** */
app.get("/users", (req, res) => {
  // Route handler for GET /users
  res.status(200).json({
    success: true,
    data: users, // Sending the users data as response
  });
});

//********************************************** */


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
