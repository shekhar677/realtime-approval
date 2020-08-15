import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Form from './pages/form/form';
import Pending from './pages/pending/pending';
import Approved from './pages/approved/approved';
import Request from './pages/request/request';
import Rejected from './pages/rejected/rejected';
import Login from './pages/login/login';
import Register from './pages/register/register';
import AuthService from './services/auth';

function App() {
  const history = useHistory();
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // logout user if token is not present
    onLoad();
  }, []);

  async function onLoad() {
    if (!isAuthenticated) {
      // redirect to login page
    }
    try {
      setAuthenticated(AuthService.authenticated());
    } catch (e) {
      // alert(e);
    }
  }

  // if (isAuthenticated) {
  //   console.log(isAuthenticated)
    return (
      <div className="min-h-screen bg-gray-200">
        <Router>
          <Switch>
            <Route path="/" exact component={ Form }></Route>
            <Route path="/pending" component={ Pending }></Route>
            <Route path="/approved" component={ Approved }></Route>
            <Route path="/request" component={ Request }></Route>
            <Route path="/rejected" component={ Rejected }></Route>
            <Route path="/login" component={ Login }></Route>
          </Switch>
        </Router>
      </div>
    )
    // } else {
      //   return (
        //     <div className="min-h-screen bg-gray-200">
        //       <Router>
        // <Redirect to="/login" />
  //         <Route path="/login" component={ Login }></Route>
  //       </Router>
  //     </div>
  //   );
  // }
}

export default App;
