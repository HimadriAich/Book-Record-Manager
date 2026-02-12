const mongoose = require("mongoose"); // Importing Mongoose library for MongoDB interaction

function DbConnection() {      // Defining a constructor function for database connection

    const DB_URL = process.env.MONGO_URI; // Retrieving the database URI from environment variables

    // Connecting to the MongoDB database using Mongoose
    mongoose.connect(DB_URL);   // Establishing connection to the database using the provided URI 

} 

const db = mongoose.connection; // Getting the default Mongoose connection

// Event listener for connection errors
db.on("error", console.error.bind(console, "Connection error:")); // Logging connection errors to the console
// bind method is used to set the this value in the callback function
//it basically means that whenever an error event occurs on the db object, the provided callback function will be executed


// Event listener for successful connection
//database should be connected to server only once 
db.once("open", function() {       // Once the connection is open
    console.log("Database connected successfully") // Logging successful connection message
})

module.exports = DbConnection; // Exporting the DbConnection function for use in other files