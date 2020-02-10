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
    res.status(500).json({ errorMessage: "Users information could not be retrieved." });
  });
});

server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id).then(user => {
    if (user.length === 0) {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
      res.status(200).json(user);
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  });
});

// add user
server.post('/api/users', (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio ) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }

  Users.insert(newUser).then(user => {
    res.status(201).send(user);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
  });
});