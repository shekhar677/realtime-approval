import React from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import AuthService from '../services/auth';
// import Notification from './notification';

function Navbar() {
  const history = useHistory();
  const location = useLocation();

  function logoutUser() {
    AuthService.logout();
    history.push('/login');
  }

  return (
    <div className="shadow-lg bg-green-400 p-3 flex items-center">
      <Link to="/"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md text-gray-800 hover:text-white"}>Form</button></Link>
      <Link to="/request"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md text-gray-800 hover:text-white"}>Requested</button></Link>
      <Link to="/pending"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md text-gray-800 hover:text-white"}>Pending</button></Link>
      <Link to="/approved"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md text-gray-800 hover:text-white"}>Approved</button></Link>
      <Link to="/rejected"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md text-gray-800 hover:text-white"}>Rejected</button></Link>
      <div className="spacer"></div>
      <svg className="w-6 h-6 mr-3 cursor-pointer" style={{fill: '#2d3748'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416 416"><path d="M208 416c23.573 0 42.667-19.093 42.667-42.667h-85.333C165.333 396.907 184.427 416 208 416zM336 288V181.333c0-65.6-34.88-120.32-96-134.827V32c0-17.707-14.293-32-32-32s-32 14.293-32 32v14.507c-61.12 14.507-96 69.227-96 134.827V288l-42.667 42.667V352h341.333v-21.333L336 288z"/></svg>
      <button onClick={logoutUser} className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md text-gray-800 hover:text-white"}>Logout</button>
    </div>
  );
}

export default Navbar;
