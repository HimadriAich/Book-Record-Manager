const express = require("express");
const { users } = require("../data/users.json"); // Importing users data from JSON file
const router = express.Router(); // Creating a new router instance for user routes, this is done because we are creating routes in this file
// Vimp: we use express.Router() to create a new router object that can handle routes separately from the main app


/*
* Route: /                 //route to get all users
* Method: GET             //HTTP GET method to retrieve data 
* Description: Get all users     //fetching all users from the data source
* Access: Public         // no authentication needed
* Parameters: None    //no parameters needed to get all users
 */

// http://localhost:8081/users
router.get("/", (req, res) => {   // if url ends with /users , this route handler will be called
  // Route handler for GET /users
  res.status(200).json({
    success: true,
    data: users, // Sending the users data as response
  });
});

//********************************************** */
/* http://localhost:8081/users/2
* Route: /:id                 //Vimp: route to get a specific user by ID, after writing the route, add /:id to indicate a parameter
* Method: GET             //HTTP GET method to retrieve data 
* Description: Get a specific user by ID     //fetching a specific user from the data source
* Access: Public         // no authentication needed
* Parameters: id    //parameter needed to get a specific user
 */

router.get("/:id", (req, res) => {  // if url ends with /users/:id , this route handler will be called
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
* Route: /               //route to create a new user
* Method: POST             // HTTP POST method to create data
* Description: Creating a new user     //creating a new user in the data source
* Access: Public         // no authentication needed
* Parameters: none   //no parameters needed to create a new user

We need to pass the fields such as id, name, etc in the body of the POST request in json format
 */
router.post("/", (req, res) => {    // Route handler for POST /users
  
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
* Route: /:id                //  route to update a user's information by ID
* Method: PUT            // HTTP PUT method to update data
* Description: Updating a user's information     //updating a user's information in the data source
* Access: Public         // no authentication needed
* Parameters: none   //no parameters needed to update a user's information
*/
router.put("/:id", (req, res) => {   // Route handler for PUT /users/:id

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
  const updateUserData = users.map((each) => {  // Mroutering through the users array to update the specific user
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
* Route: /:id                //  route to delete a user's information by ID
* Method: DELETE           // HTTP DELETE method to delete data
* Description: Deleting a user's information     //deleting a user's information in the data source
* Access: Public         // no authentication needed
* Parameters: none   //no parameters needed to delete a user's information
*/

router.delete("/:id", (req, res) => {   // Route handler for DELETE /users/:id

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
    const index = users.indexOf(user); // Finding the index of the user to be deleted
    users.splice(index, 1); // Removing the user from the users array
    
    return res.status(200).json({   // Sending a JSON response with status 200
        success: true,
        message: "User deleted successfully!!",
        data: users,   // Sending the updated users array as response
    });
  });

  module.exports = router;   // Exporting the router to be used in other files