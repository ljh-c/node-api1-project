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

// return user by id
server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id).then(user => {
    if (!user) {
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
  const { name, bio } = req.body;
  const newUser = { name, bio };
  
  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.insert(newUser).then(user => {
      Users.findById(user["id"]).then(userObj => {
        res.status(201).json(userObj);
      }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "There was an error with findById." })
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database." });
    });
  }
});

// delete user
server.delete('/api/users/:id', (req, res) => {   
  Users.findById(req.params.id).then(user => {
    if (!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
      Users.remove(req.params.id).then(numDeleted => {
        if (numDeleted === 1) {
          res.status(200).json(user);
        } else {
          res.status(500).json({ message: "remove() did not work as expected" });
        }
      }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "remove() did not work" })
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "The user could not be removed." });
  });
});

// update user

server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;
  const editedUser = { name, bio };

  Users.findById(req.params.id).then(user => {
    if (!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else if (!name || !bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      Users.update(req.params.id, req.body).then(numUpdated => {
        if (numUpdated === 1) {
          Users.findById(req.params.id).then(user => {
            res.status(200).json(user);
          });
        } else {
          res.status(500).json({ errorMessage: "The user information could not be modified."});
        }
      }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be modified." });
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "The user information could not be retrieved." });
  });
});