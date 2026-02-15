// DATA TRANSFER OBJECT (DTO) FOR BOOK DETAILS
// A DTO is an object that is used to transfer data between different layers of the application, it is used to encapsulate the data and send it from one layer to another, in this case, we are using a DTO to transfer the user details along with the issued book details from the database to the client in the response, this is done to avoid sending unnecessary data to the client and to structure the data in a way that is easy to understand and use for the client
// we are creating a DTO to transfer the user details along with the issued book details from the database to the client in the response, this is done to avoid sending unnecessary data to the client and to structure the data in a way that is easy to understand and use for the client
// we are creating a class named IssuedBook which will be used as a DTO to transfer the user details along with the issued book details from the database to the client in the response, this is done to avoid sending unnecessary data to the client and to structure the data in a way that is easy to understand and use for the client
// we will create a constructor that takes the user document as a parameter and initializes the fields of the issuedBook class with the values from the user document, and then we will return this object in the response to the client, this is done to transfer the user details along with the issued book details from the database to the client in the response


class IssuedBook {    //note: class name starts with uppercase letter
    _id; // _id is a special feature- bcoz its an auto-generated field by MongoDB
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;
 // rest fields apart from the id dont have underscore bcoz they are user-defined fields


// whenever we create object, the constructor gets invoked = Parameterized constructor
// we need a constructor because we need to initialize the fields of the issuedBook class with the values from the user document that we get from the database, and then we will return this object in the response to the client, this is done to transfer the user details along with the issued book details from the database to the client in the response
// we will pass the user document that we get from the database as a parameter to the constructor, and then we will initialize the fields of the issuedBook class with the values from the user document, and then we will return this object in the response to the client
// we will create an object of the issuedBook class for each user who has issued a book, and then we will return an array of these objects in the response to the client, this is done to transfer the user details along with the issued book details from the database to the client in the response
// we will create a constructor that takes the user document as a parameter and initializes the fields of the issuedBook class with the values from the user document, and then we will return this object in the response to the client, this is done to transfer the user details along with the issued book details from the database to the client in the response

    constructor(user){   // user parameter is the user document that we get from the database
        this._id = user.issuedBook._id;    
        this.name = user.issuedBook.name;
        this.genre = user.issuedBook.genre;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        // the below three fields are in users.json(users data), so we directly write user.issuedBy, 
        // user.issuedDate and user.returnDate, we dont need to write user.issuedBook.issuedBy, user.issuedBook.issuedDate and user.issuedBook.returnDate
        //  because these fields are not in the book document, they are in the user document, so we directly write user.issuedBy, user.issuedDate and user.returnDate
        this.issuedBy = user.issuedBy;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    } 

}
module.exports = IssuedBook;








