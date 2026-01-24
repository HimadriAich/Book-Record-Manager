const express = require("express");
const { users } = require("../data/users.json"); // Importing users data from JSON file
const router = express.Router(); // Creating a new router instance for user routes, this is done because we are creating routes in this file
// Vimp: we use express.Router() to create a new router object that can handle routes separately from the main app
 
/********************************************** */
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
  const updateUserData = users.map((each) => {  // routering through the users array to update the specific user
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
/************************************************* */
/*  VERY IMPORTANT- GET ALL USER SUBSCRIPTION DETAILS  
* Route: /users/subscription-details/:id                //  route to get a user's subscription details by ID
* Method: GET            // HTTP GET method to retrieve data
* Description:        Getting a user's subscription details     //fetching a user's subscription details in the data source
* Access: Public         // no authentication needed
* Parameters: id   //parameter needed to get a user's subscription details
*/

router.get("/subscription-details/:id", (req, res) => {   // Route handler for GET /users/subscription-details/:id

    const { id } = req.params; // Extracting the 'id' parameter from the request URL, curly braces used for destructuring(means extracting specific value from an object)
    const user = users.find((each) => each.id === id); // Finding the user with the matching ID in the users array
    // No curlybraces around user in above line because we are returning the whole user object, not extracting any specific property from it
    // here user refers to the user object(containing id, name, surname etc.) found with the matching ID
// Vimp: here each represents each user object in the users array, 'each' is ajust a variable name, can be anything
  
  if (!user) {   // if user not found
    return res.status(404).json({
      // Sending a JSON response with status 404
        success: false,       // Indicating the request was unsuccessful
        message: `User with id ${id} not found`,
    });
    }
  // else, user found
  const getDateInDays = (data = "") => { // Function to convert date to days 

    let date;
    if (data === "") {
      date = new Date(); // Current date if no date is provided
    } else {
      date = new Date(data); // Converting provided date string to Date object
    }

    let days = Math.floor(date / (1000 * 60 * 60 * 24)); // Converting milliseconds to days, floor method means rounding off to nearest integer(floor of 4.7 is 4)
  // 1000*60*60*24 means milliseconds in a day
    return days;
  }; 

  const subscriptionType = (date) => {  // Function to determine subscription type based on subscription duration
    if (user.subscriptionType === "Basic") {
      date = date + 90; // Basic subscription lasts for 90 days
    }
    else if (user.subscriptionType === "Standard") {
      date = date + 180; // Standard subscription lasts for 180 days
    }
    else if (user.subscriptionType === "Premium") {
      date = date + 365; // Premium subscription lasts for 365 days
    }
    return date;
  }; 

  //Jan 01 1970 is the starting date for javascript date object
  let returnDate = getDateInDays(user.returnDate); // Converting return date to days
  let currentDate = getDateInDays(); // Converting current date to days,   we need currentDate if there is any fine or not

  let subscriptionDate = getDateInDays(user.subscriptionDate); // Converting subscription date to days
  
  let subscriptionExpiration = subscriptionType(subscriptionDate); // Calculating subscription expiration date in days
  //in the aboveline we are basically passing subscriptionDate to subscriptionType function which will return the expiration date based on the type of subscription

  const dt = {   // Vimp: creating an object dt to hold all the date related info
    ...user,   // Spread operator to include all user properties
    isSubscriptionExpired : subscriptionExpiration <= currentDate, // Checking if subscription has expired
    // if subscriptionExpiration is less than currentDate, then subscription has expired

    daysLeftForExpiration : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate, // Calculating days left for subscription expiration
  
    fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 100 : 50 : 0, // Calculating fine based on return date and subscription status
  };
// in above line, if returnDate is less than currentDate, then check if subscription has expired, if yes fine is 100, else fine is 50, else fine is 0

  return res.status(200).json({   // Sending a JSON response with status 200
        success: true,
        message: "User subscription details fetched successfully!!",
        data: dt,   // Sending the subscription details as response
    });
});
/************************************************* */
  module.exports = router;   // Exporting the router to be used in other files