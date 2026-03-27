const express = require('express');
let books = require("./booksdb.js");

const public_users = express.Router();

const axios = require('axios');


// Task 10: Get all books using async/await with Axios
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get("http://localhost:5000/books");
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});


// Task 11: Get book details based on ISBN using Promises with Axios
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    axios.get("http://localhost:5000/books")
        .then((response) => {
            const booksData = response.data;

            if (booksData[isbn]) {
                return res.status(200).json(booksData[isbn]);
            } else {
                return res.status(404).json({ message: "Book not found" });
            }
        })
        .catch(() => {
            return res.status(500).json({ message: "Error fetching books" });
        });
});


// Task 12: Get book details based on author using async/await with Axios
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
        const response = await axios.get("http://localhost:5000/books");
        const booksData = response.data;

        const filteredBooks = Object.values(booksData).filter(
            (book) => book.author === author
        );

        if (filteredBooks.length > 0) {
            return res.status(200).json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found for this author" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
});


// Task 13: Get book details based on title using Promises with Axios
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    axios.get("http://localhost:5000/books")
        .then((response) => {
            const booksData = response.data;

            const filteredBooks = Object.values(booksData).filter(
                (book) => book.title === title
            );

            if (filteredBooks.length > 0) {
                return res.status(200).json(filteredBooks);
            } else {
                return res.status(404).json({ message: "No books found with this title" });
            }
        })
        .catch(() => {
            return res.status(500).json({ message: "Error fetching books" });
        });
});


module.exports.general = public_users;
