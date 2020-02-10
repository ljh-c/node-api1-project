// `npm i express`
// `npm run server` to start API

const express = require('express');

const Users = require('./data/db.js');

const server = express();

const port = 5000;
server.listen(port, console.log(`API on port ${port}`));

// so express reads JSON from body
server.use(express.json());

// return list of users
server.get('/api/users', (req, res) => {
  Users.find().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    console.log(err);    
    res.status(500).json({ errorMessage: "The users information could not be retrieved." });
  });
});