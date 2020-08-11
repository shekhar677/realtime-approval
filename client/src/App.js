import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './components/navbar';
import Form from './pages/form/form';
import Pending from './pages/pending/pending';
import Approval from './pages/approval/approval';
import Request from './pages/request/request';
import Rejected from './pages/rejected/rejected';
import Login from './pages/login//login';

function App() {
  return (
    <Router>
      <Navbar/>
      <Container>
        <Switch>
          <Route path="/" exact component={ Form }></Route>
          <Route path="/pending" exact component={ Pending }></Route>
          <Route path="/approval" exact component={ Approval }></Route>
          <Route path="/request" exact component={ Request }></Route>
          <Route path="/rejected" exact component={ Rejected }></Route>
          <Route path="/login" exact component={ Login }></Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
