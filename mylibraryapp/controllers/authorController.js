// provide the controller a link to the author model
var authors = require('../models/author');
// Function to handle a request to get all authors
const getAllAuthors = (req, res) => {
res.send(authors); // return the list of authors
};

// Function to handle a request to a particular author
const getAuthorByID = (req, res) => {
    // search for author in the database via ID
    const author = authors.find(author => author.id === req.params.id);
    if (author){
    res.send(author); // send back the author details
    }
    else{
    // you can decide what to return if author is not found
    // currently, an empty list will be return.
    res.status(404).send('ERROR 404: The author with the given ID was not found');
    }
};

// Remember to export the callbacks
module.exports = {
 getAllAuthors,
 getAuthorByID,
};

