import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CardActions } from '@material-ui/core';

import DeleteAlert from './DeleteAlert';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  cardContent: {
    flexGrow: 1
  },

  cardActions: {
    justifyContent: 'space-around'
  }
}));

const UserCard = ({ user, fetchUsers }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
          <Typography>
            {user.bio}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <DeleteAlert user={user} fetchUsers={fetchUsers} />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default UserCard;