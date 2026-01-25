# Book-Record-Manager

A book record management application

Server >> Storing certain book data >> User Registration >> Subscriber

This is a book record management API Server/ Backend for the library system or management of records or manuals or books

Fine System:
User: 06/03/2025 - 06/03/2025
09/06/2025 => 50\*3=150 (50 Rs fine for each day after the due date)

## Subscription Types:

3 months (Basic)
6 months (Standard)
12 months (Premium)

IF the subscription type is standard && if the subscription date is 06/03/2025
=> then subscription valid till 06/09/2025

Within subscription date >> if we miss the renewal(of book) >> 50/- day

If subscription date is also been missed >> and also missed the renewal >> 100 + 50/- day

> > book1
> > basic subscription
> > 06/03/2025 -> subscription date
> > 07/03/2025 -> borrowed book from library
> > book1 renewal date is on 21/03/2025 (2 weeks i.e till 21/3/2025)
> > 23/03/2025 -> we need to pay a fine of rs 50\*2=100/- (we are 2 days late)

---

> > book2
> > basic subscription
> > 06/03/2025 -> subscription date
> > 07/03/2025 -> borrowed book from library
> > book1 renewal date is on 21/03/2025 (2 weeks)
> > 23/06/2025 -> we need to pay a fine of 100(for subsciption renewal miss) + (no. of day book renewal miss \* 50)

missed by renewal date >> 50/-
missed by subscription date >> 100/-
missed by both renewal date and subsciption>> 100+50=150/-
(irrespective of no. of days)

# Routes and Endpoints to be made

## (1) /users- in order for a student/user to register

POST: Create a new user
GET: Get all the users

## (2) /users/{id}- for specific user (using his or her student id)

GET: Get a user by passing his/her id
PUT: To update user info by their ID
DELETE: To delete the user by id (once he/she passes out of college) && (is there any fine to be paid ?)

## (3) /users/subscription-details/{id}

GET: Get user subscription details >> Date of Subscription >> Valid till >> Is there any fine to be paid

## (4) /books- in order to keep track of all the books in the library

GET: Get all the books
POST: Create/Add a new book

## (5) /books/{id}

GET: Get a book by id
PUT: Update a book by id

## (6) /books/issued- all those books which have been issued

GET: Get all issued books

## (7) /books/issued/withFine- those issued books which have been fined

GET: Get all issued books with their fines

## npm init

## npm i nodemon --save-dev (developers dependencies)

## npm run dev


...each
"name": "Jane",
        "surname": "Doe",
        "email": "user@email.com",
        "subscriptionType": "Premium",
        "subscriptionDate": "01/01/2025"



...data
"data":  {
  "name": "rohan",
  "surname": "kinnal"
}

******************************************************
 const index = users.indexOf(user); 
 users.splice(index, 1); 

var class = ["six","seven","eight"];
indexOf()
class.indexOf("seven")





*************************
MVC Arch => Controllers