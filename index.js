const express = require("express"); // Importing Express framework
const {users} = require("./data/users.json"); // Importing users data from JSON file
const {books} = require("./data/books.json"); // Importing books data from JSON file

const app = express(); // Creating an Express application instance

const PORT = 8081; // Defining the port number for the server to listen on

app.use(express.json()); // Middleware to parse JSON request bodies

/************ ROUTES ************/
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
/*
* Route: /users                 //route to get all users
* Method: GET             //HTTP GET method to retrieve data 
* Description: Get all users     //fetching all users from the data source
* Access: Public         // no authentication needed
* Parameters: None    //no parameters needed to get all users
 */
app.get("/users", (req, res) => {
  // Route handler for GET /users
  res.status(200).json({
    success: true,
    data: users, // Sending the users data as response
  });
});

//********************************************** */
/* http://localhost:8081/users/2
* Route: /users/:id                 //Vimp: route to get a specific user by ID, after writing the route, add /:id to indicate a parameter
* Method: GET             //HTTP GET method to retrieve data 
* Description: Get a specific user by ID     //fetching a specific user from the data source
* Access: Public         // no authentication needed
* Parameters: id    //parameter needed to get a specific user
 */

app.get("/users/:id", (req, res) => {
  // Route handler for GET /users/:id
  // const id = req.params.id;  // Extracting(requesting) the 'id' parameter from the request URL
  
  const { id } = req.params; // Extracting(requesting) the 'id' parameter from the request URL
 //req.params simply means that we are accessing the id parameter from the URL

  console.log(req.params); // Logging the request parameters to the console
 
  const user = users.find((each) => each.id === id); // Finding the user with the matching ID in the users array
// Vimp: here each represents each user object in the users array, 'each' is ajust a variable name, can be anything
  if (!user) {
    // If no user is found with the given ID
    return res.status(404).json({
      // Sending a JSON response with status 404
      success: false,       // Indicating the request was unsuccessful
      message: `User with id ${id} not found`
    });
  }
  else{
  return res.status(200).json({
    // If user is found, sending a JSON response with status 200
    success: true,        // Indicating the request was successful
    message: "User found",
    data: user          // Sending the found user data as response
  });
}
});

//********************************************** */
/* 
* Route: /users                //route to create a new user
* Method: POST             // HTTP POST method to create data
* Description: Creating a new user     //creating a new user in the data source
* Access: Public         // no authentication needed
* Parameters: none   //no parameters needed to create a new user

We need to pass the fields such as id, name, etc in the body of the POST request in json format
 */
app.post("/users", (req, res) => {    // Route handler for POST /users
  
    const {id, name, age, surname, email, subscriptionType, subscriptionDate} = req.body; // Extracting user details from the request body
//req.body simply means that we are accessing the body of the request where the user details are sent in JSON format

    const user = users.find((each) => each.id === id); // Checking if a user with the same ID already exists

    if(user){
        return res.status(404).json({    // If user with the same ID exists, sending a JSON response with status 404
            success: false,
            message: `User with id ${id} already exists`
        });
    }
//else, create the new user
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });  // Adding the new user to the users array

    return res.status(201).json({   // Sending a JSON response with status 201 (Created)
        success: true,
        message: "User created successfully",
        data: users,   // Sending the updated users array as response
    });
});
/************************************************** */

/*  UPDATE USER INFO USING ID - PUT REQUEST  
* Route: /users/:id                //  route to update a user's information by ID
* Method: PUT            // HTTP PUT method to update data
* Description: Updating a user's information     //updating a user's information in the data source
* Access: Public         // no authentication needed
* Parameters: none   //no parameters needed to update a user's information
*/
app.put("/users/:id", (req, res) => {   // Route handler for PUT /users/:id

    const { id } = req.params; // Extracting the 'id' parameter from the request URL
    const {data} = req.body; // this will contain the updated data in json format

    const user = users.find((each) => each.id === id); // Finding the user with the matching ID in the users array
// Vimp: here each represents each user object in the users array, 'each' is ajust a variable name, can be anything
  if (!user) {
    // If no user is found with the given ID
    return res.status(404).json({
      // Sending a JSON response with status 404
      success: false,       // Indicating the request was unsuccessful
      message: `User with id ${id} not found`,
    });
  }

// else, update the user
  const updateUserData = users.map((each) => {  // Mapping through the users array to update the specific user
    if (each.id === id) {
      return {
        ...each,   // Spread operator to retain existing user properties
        ...data,   // Spread operator to update with new data from the request body
      };
    }
    return each;  // Returning the user as it is, if ID does not match
  });

// NOTE: each contains the existing user data, data contains the new data to be updated

    return res.status(200).json({   // Sending a JSON response with status 200
        success: true,
        message: "User updated successfully!!",
        data: updateUserData,
    });
});
/******************************************* */

/*  DELETE USER USING ID - DELETE REQUEST  
* Route: /users/:id                //  route to delete a user's information by ID
* Method: DELETE           // HTTP DELETE method to delete data
* Description: Deleting a user's information     //deleting a user's information in the data source
* Access: Public         // no authentication needed
* Parameters: none   //no parameters needed to delete a user's information
*/

app.delete("/users/:id", (req, res) => {   // Route handler for DELETE /users/:id

    const { id } = req.params; // Extracting the 'id' parameter from the request URL
    const user = users.find((each) => each.id === id); // Finding the user with the matching ID in the users array
// Vimp: here each represents each user object in the users array, 'each' is ajust a variable name, can be anything
  if (!user) {
    // If no user is found with the given ID
    return res.status(404).json({
      // Sending a JSON response with status 404
        success: false,       // Indicating the request was unsuccessful
        message: `User with id ${id} not found`,
    });
    }

// else, delete the user
});


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
