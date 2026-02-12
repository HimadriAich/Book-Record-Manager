// CREATING A MODEL (TO ADD DATA TO THE DATABASE)

const mongoose = require('mongoose');

const Schema = mongoose.Schema; // creating a schema for the book model. NOTE:IN Schema S is capitalized because it is a constructor function.

const bookSchema = new Schema({
    name: {                      // name is a string and is required
        type: String, 
        required: true, 
    }, 

    author:{
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    genre: {
        type: String,
        required: true,
    },

    publisher: {
        type: String,
        required: true,
    },

},

{
    timestamps: true, // this will automatically add createdAt and updatedAt fields to the schema
}
);

module.exports = mongoose.model("Book", bookSchema); // exporting the model so that it can be used in other parts of the application. The first argument is the name of the model and the second argument is the schema.










