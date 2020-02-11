import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

const DeleteAlert = ({ user, fetchUsers }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/users/${user.id}`)
      .then(res => {
        fetchUsers();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Button size="small" color="secondary" variant="outlined" onClick={handleOpen}>Delete</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-delete-project"
        aria-describedby="alert-confirm delete"
      >
        <DialogTitle id="alert-delete-project">{`Delete "${user.name}"?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAlert;