const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// --- Task 10: Get the list of books available in the shop using Async/Await ---
public_users.get('/', async function (req, res) {
    try {
        const getBooks = () => {
            return new Promise((resolve) => {
                resolve(books);
            });
        };
        const allBooks = await getBooks();
        res.status(200).send(JSON.stringify(allBooks, null, 4));
    } catch (error) {
        res.status(500).json({message: "Error retrieving books"});
    }
});

// --- Task 11: Get book details based on ISBN using Promises ---
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const findBook = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    });

    findBook
        .then((book) => res.status(200).send(JSON.stringify(book, null, 4)))
        .catch((err) => res.status(404).json({message: err}));
});

// --- Task 12: Get book details based on author using Async/Await ---
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const getByAuthor = () => {
            return new Promise((resolve) => {
                let filteredBooks = Object.values(books).filter(b => b.author === author);
                resolve(filteredBooks);
            });
        };
        const result = await getByAuthor();
        res.status(200).json({booksbyauthor: result});
    } catch (error) {
        res.status(500).json({message: "Error searching by author"});
    }
});

// --- Task 13: Get book details based on title using Promises ---
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const getByTitle = new Promise((resolve) => {
        let filteredBooks = Object.values(books).filter(b => b.title === title);
        resolve(filteredBooks);
    });

    getByTitle.then((result) => res.status(200).json({booksbytitle: result}));
});

// Get book review (Остается без изменений)
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
        res.status(404).json({message: "Book not found"});
    }
});

// Регистрация (Остается без изменений)
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) { 
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "Customer successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});    
        }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

module.exports.general = public_users;
