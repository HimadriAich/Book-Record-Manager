// CREATING A MODEL (TO ADD DATA TO THE DATABASE)

const mongoose = require('mongoose');

const Schema = mongoose.Schema; // creating a schema for the book model

const userSchema = new Schema(
    {
        name: {
            type: String,   //String- S in uppercase because it is a constructor function
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure email is unique
        },
        issuedBook: {  // we cannot write it directly here, as we have to reference the book model, so we will use the ObjectId type and reference the Book model
             type: mongoose.Schema.Types.ObjectId, // Reference to the Book model
             ref: 'Book', // The name of the model being referenced
             required: false, // This field is optional, as a user may not have issued a book
        },
        returnDate: {
            type: String,
            required: false, // This field is optional, as a user may not have issued a book 
        },
        subscriptionType: {
            type: String,
            required: true,
        },
        subscriptionDate: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('User', userSchema); // Exporting the model so that it can be used in other parts of the application. The first argument is the name of the model and the second argument is the schema.







