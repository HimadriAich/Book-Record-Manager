const {BookModel, UserModel} = require("../models"); // Importing the User and Book models from the models' index.js file
// we are importing the models here because we might need to interact with the database to get or update book and user details

exports.getAllUsers = async(req,res) => {

    const users = await UserModel.find(); // Fetching all users from the database using the UserModel's find method

    if(users.length === 0){ // If no users are found, return a 404 status with a message
        return res.status(404).json({
            success: false,
            message: "No users found in the database"
        });
    }

    //else, if users are found, return a 200 status with the users data
    return res.status(200).json({
        success: true,
        message: "These are the user info: ",
        data: users
    });

}

/***************************************************** */

exports.getSingleUserById = async(req,res) => {

    const {id} = req.params; // Extracting the id parameter from the request parameters

    const user = await UserModel.findById(id); // Fetching a single user from the database using the UserModel's findById method and passing the id as an argument
// above we can write await UserModel.findById({_id:id}) as well but since _id is the default primary key in MongoDB, we can directly pass the id as an argument to the findById method
    if(!user){ // If no user is found with the given id, return a 404 status with a message
        return res.status(404).json({
            success: false,
            message: `No user found with the id ${id}`
        });
    }
    //else, if a user is found with the given id, return a 200 status with the user data
    return res.status(200).json({
        success: true,
        message: `This is the user with the id ${id}: `,
        data: user
    });
}

/***************************************************** */

exports.createNewUSer = async(req,res) => {

    const {data} = req.body; // Extracting the data from the request body which contains the new user information

    if(!data || Object.keys(data).length === 0){ // If the data is not present in the request body, return a 400 status with a message
        return res.status(400).json({
            success: false,
            message: "User details are required to create a new user"
        });
    }

    await UserModel.create(data); // Creating a new user in the database using the UserModel's create method and passing the data as an argument
    const getAllUsers = await UserModel.find(); // Fetching all users from the database to return the updated list of users after creating a new user

    return res.status(200).json({
        success: true,
        message: "New user created successfully",
        data: getAllUsers // Returning the updated list of users after creating a new user
    });
}

/******************************************************* */

exports.updateUserById = async(req,res) => {

    const {id} = req.params; // Extracting the id parameter from the request parameters
    const {data} = req.body; // Extracting the data from the request body which contains the updated user information

// above, we put id and data in curly braces because we are using destructuring to extract the id and data from the request parameters and request body respectively

    if(!data || Object.keys(data).length === 0){ // If the data is not present in the request body, return a 400 status with a message
        return res.status(400).json({
            success: false,
            message: "User details are required to update the user data"
        });
    }

    // check if user exists
    const user = await UserModel.findById(id); // Fetching a single user from the database using the UserModel's findById method and passing the id as an argument to check if the user exists before updating

    if(!user){ // If no user is found with the given id, return a 404 status with a message
        return res.status(404).json({
            success: false,
            message: `No user found with the id ${id}`
        });
    }

    //update the user data
    const updatedUserData = await UserModel.findByIdAndUpdate(id, data, {new: true}); // Updating a single user in the database using the UserModel's findByIdAndUpdate method and passing the id, data and an options object with new: true to return the updated user data after updating
    return res.status(200).json({
        success: true,
        message: "User data updated successfully",
        data: updatedUserData,
    });
}

/***************************************************** */

exports.deleteUserById = async(req,res) => {

    const {id} = req.params; // Extracting the id parameter from the request parameters

    //check if user exists
    const user =await UserModel.findById(id); // Fetching a single user from the database using the UserModel's findById method and passing the id as an argument
    
    if(!user) { // If no user is found with the given id, return a 404 status with a message
        return res.status(404).json({
            success: false,
            message: `No user found with the id ${id}`
        });
    }

    //else, if a user is found and deleted with the given id, return a 200 status with a message
    await UserModel.findByIdAndDelete(id); // Deleting a single user from the database using the UserModel's findByIdAndDelete method and passing the id as an argument
    
    return res.status(200).json({
        success: true,
        message: `User with the id ${id} has been deleted successfully`,
        data: user
    });
};

/***************************************************** */

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;

    // Find the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }

    // Extract the subscription details
    const getDateInDays = (data = '') => {
        let date;
        if (data) {
            date = new Date(data);
        } else {
            date = new Date();
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90
        } else if (user.subscriptionType === "Standard") {
            date = date + 180
        } else if (user.subscriptionType === "Premium") {
            date = date + 365
        }
        return date;
    }

    // Subscription Expiration Calculation 
    // January 1, 1970 UTC // milliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data
    });
}



