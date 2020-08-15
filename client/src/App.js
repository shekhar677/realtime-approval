import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Form from './pages/form/form';
import Pending from './pages/pending/pending';
import Approved from './pages/approved/approved';
import Request from './pages/request/request';
import Rejected from './pages/rejected/rejected';
import Login from './pages/login/login';
import Loader from './components/loader';
import AuthService from './services/auth';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    axiosInterceptor();
    onLoad();
  }, []);

  function onLoad() {
    if (!isAuthenticated) {
      // redirect to login page
    }
    try {
      setAuthenticated(AuthService.authenticated());
    } catch (e) {
      // alert(e);
    }
  }

  function axiosInterceptor() {
    axios.interceptors.request.use(function (config) {  
      setLoader(true);
      return config
    }, function (error) {
      return Promise.reject(error);
    });
    
    axios.interceptors.response.use(function (response) {
      setLoader(false);
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  }

  // if (AuthService.authenticated()) {
  //   console.log(AuthService.authenticated())
    return (
      <div className="min-h-screen bg-gray-200">
        <Router>
          <Loader status={loader} />
          <Switch>
            <Route path="/" exact component={ Form }></Route>
            <Route path="/pending" component={ Pending }></Route>
            <Route path="/approved" component={ Approved }></Route>
            <Route path="/request" component={ Request }></Route>
            <Route path="/rejected" component={ Rejected }></Route>
            <Route exact path="/login" component={ Login }></Route>
          </Switch>
        </Router>
      </div>
    )
  // } else {
  //   return (
  //     <div className="min-h-screen bg-gray-200">
  //       <Router>
  //         <Redirect to="/login" />
  //         <Route exact path="/login" component={ Login }></Route>
  //       </Router>
  //     </div>
  //   );
  // }
}

export default App;
