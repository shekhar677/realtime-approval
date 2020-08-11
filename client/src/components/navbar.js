import React from 'react';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  btn: {
    textTransform: 'Capitalize',
    margin: '0 0.5rem'
  }
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" className={ classes.btn } component={ Link } to={ '/' }>Form</Button>
        <Button color="inherit" className={ classes.btn } component={ Link } to={ '/pending' }>Pending</Button>
        <Button color="inherit" className={ classes.btn } component={ Link } to={ '/approval' }>Approval</Button>
        <Button color="inherit" className={ classes.btn } component={ Link } to={ '/request' }>Request</Button>
        <Button color="inherit" className={ classes.btn } component={ Link } to={ '/rejected' }>Rejected</Button>
        <div style={{ flex:1 }}></div>
        <Button color="inherit" component={ Link } to={ '/login' }>Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
