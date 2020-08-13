import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Form from './pages/form/form';
import Pending from './pages/pending/pending';
import Approved from './pages/approved/approved';
import Request from './pages/request/request';
import Rejected from './pages/rejected/rejected';
import Login from './pages/login/login';
import Register from './pages/register/register';
import AuthService from './services/auth';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      setAuthenticated(AuthService.authenticated())
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

            {/* use authentication for these routes */}
            <Route path="/login" component={ Login }></Route>
            <Route path="/register" component={ Register }></Route>
          </Switch>
        </Router>
      </div>
    )
  // } else {
  //   return (
  //     <div className="min-h-screen bg-gray-200">
  //       <Router>
  //         <Redirect to="/login" />
  //         {/* <Switch>
  //           <Route path="/login" component={ Login }></Route>
  //           <Route path="/register" component={ Register }></Route>
  //         </Switch>  */}
  //       </Router>
  //     </div>
  //   );
  // }
}

export default App;
