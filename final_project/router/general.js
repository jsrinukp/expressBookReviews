const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    users.push({"username":req.query.username,"password":req.query.password});
    res.send("Congrats! The user" + (' ')+ (req.query.username) + " Has been Registered!")
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let booksPromise = new Promise((resolve,reject) => {
     resolve(res.send(JSON.stringify(books)));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_books =Object.values(books).filter((books => books.isbn === isbn));
    let isbnPromise = new Promise((resolve,reject) => {
    if(filtered_books.length>0){
     resolve(res.send(filtered_books));
     }else{
     reject(res.send("No Such Book Found"));
     }
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const writer = req.params.author;
    let filtered_books = Object.values(books).filter((books => books.author === writer));
    let authorPromise = new Promise((resolve,reject) => {
    if(filtered_books.length>0){
     resolve(res.send(filtered_books));
     }else{
     reject(res.send("No Such Book Found"));
     }
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title= req.params.title;
    let filtered_books = Object.values(books).filter((books => books.title === title));
    let titlePromise = new Promise((resolve,reject) => {
    if(filtered_books.length>0){
     resolve(res.send(filtered_books));
     }else{
     reject(res.send("No Such Book Found"));
     }
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn= req.params.isbn;
    let filtered_books =Object.values(books).filter((books => books.isbn === isbn));
    res.send(filtered_books[0].reviews);
});



module.exports.general = public_users;
