import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, CircularProgress, Grid } from '@material-ui/core';

import UserCard from './UserCard';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchUsers = () => {
    setIsFetching(true);

    setTimeout(() => {
      axios.get('http://localhost:5000/api/users')
      .then(res => {
        setUsers(res.data);
        setIsFetching(false);
      })
      .catch(err => {
        console.log(err);
        setIsFetching(false);
      });
    }, 2000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="md">
      <h1>All Users</h1>
      {isFetching && (
        <CircularProgress />
      )}
      {!isFetching && users && (
        <Grid container spacing={4}>
          {users.map(user => <UserCard key={user.id} user={user} fetchUsers={fetchUsers} />)}
        </Grid>
      )}
    </Container>
  )
};

export default Users;