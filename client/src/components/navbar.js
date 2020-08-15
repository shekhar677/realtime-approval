import React, { useEffect, useState } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import AuthService from '../services/auth';
import socketIOClient from "socket.io-client";
import Snackbar from '../components/snackbar';

function Navbar() {
  let ENDPOINT;
  if (process.env.NODE_ENV === 'development') {
    ENDPOINT = 'http://localhost:4000'
  }
  
  if (process.env.NODE_ENV === 'production') {
    ENDPOINT = 'https://realtime-approval.herokuapp.com'
  }

  const history = useHistory();
  const location = useLocation();
  const [notification, setNotification] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    listenForNotification();
  }, []);

  const listenForNotification = () => {
    const socket = socketIOClient(ENDPOINT);
    const departmentId = AuthService.authenticated()? AuthService.getCurrentDepartmentId() : null;
    const userId = AuthService.getCurrentUserId();
    if (departmentId && userId) {
      socket.on(departmentId, data => {
        setNotification(true);
        setNotificationData([...notificationData, data]);
      });

      socket.on(userId, data => {
        setNotification(true);
        setNotificationData([...notificationData, data]);
      });
    }

    return () => socket.disconnect();
  }

  function updateNotification() {
    setNotification(false);
    openDialog();
  }

  const openDialog = () => {
    setModal(true)
  }

  const closeDialog = () => {
    setModal(false)
  }

  function formatDate(date) {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();
    let datee = new Date(date).getDate();
    let month = new Date(date).getMonth();
    let year = new Date(date).getFullYear();
    return datee +'/'+month+'/'+year+', '+hours +':'+minutes
  }

  function logoutUser() {
    AuthService.logout();
    history.push('/login');
  }

  function goToRequestedPage(status) {
    if (status === 'pending') {
      history.push('/pending')
    } else if (status === 'approved') {
      history.push('/approved')
    } else if (status === 'requested') {
      history.push('/request')
    } else if (status === 'rejected') {
      history.push('/rejected')
    } else {
      history.push('/')
    }
    closeDialog()
  }

  function formStatusText(status) {
    let text;
    if (status === 'pending') {
      text = 'you have a pending form request.'
    } else if (status === 'approved') {
      text = 'you request has been approved.'
    } else if (status === 'requested') {
      text = 'someone sent a form approval request.'
    }else if (status === 'rejected') {
      text = 'you request has been rejected.'
    } else {
      text = status
    }
    return text;
  }

  return (
    <div className="shadow-lg bg-green-400 p-3 flex items-center">
      <Snackbar status={notification} />
      <Link to="/"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md hover:text-white font-medium"+(location.pathname === '/'? ' bg-green-500 text-white': ' text-gray-800')}>Form</button></Link>
      <Link to="/request"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md hover:text-white font-medium"+(location.pathname === '/request'? ' bg-green-500 text-white': ' text-gray-800')}>Requested</button></Link>
      <Link to="/pending"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md hover:text-white font-medium"+(location.pathname === '/pending'? ' bg-green-500 text-white': ' text-gray-800')}>Pending</button></Link>
      <Link to="/approved"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md hover:text-white font-medium"+(location.pathname === '/approved'? ' bg-green-500 text-white': ' text-gray-800')}>Approved</button></Link>
      <Link to="/rejected"><button className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md hover:text-white font-medium"+(location.pathname === '/rejected'? ' bg-green-500 text-white': ' text-gray-800')}>Rejected</button></Link>
      <div className="spacer"></div>
      <div className="relative mr-3">
        <svg onClick={updateNotification} className="w-6 h-6 cursor-pointer" style={{fill: '#2d3748'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416 416"><path d="M208 416c23.573 0 42.667-19.093 42.667-42.667h-85.333C165.333 396.907 184.427 416 208 416zM336 288V181.333c0-65.6-34.88-120.32-96-134.827V32c0-17.707-14.293-32-32-32s-32 14.293-32 32v14.507c-61.12 14.507-96 69.227-96 134.827V288l-42.667 42.667V352h341.333v-21.333L336 288z"/></svg>
        <div onClick={updateNotification} className="cursor-pointer absolute w-3 h-3 bg-red-600 rounded-full select-none" style={{top:'0.3rem', right:'-0.1rem', display: notification? 'block' : 'none'}}></div>
      </div>
      <button onClick={logoutUser} className={"outline-0 px-3 py-2 mx-2 hover:bg-green-500 rounded-md text-gray-800 hover:text-white font-medium"}>Logout</button>

      <div className="bg-red-600 p-4 fixed inset-0 flex h-screen justify-center items-center w" style={{ display: modal? "flex" : "none", background: 'rgba(0,0,0,0.7)' }}>
        <div className="bg-white rounded-md border p-4 px-6 w-1/2">
          <div className="flex mb-5">
            <div className="spacer"></div>
            <svg onClick={closeDialog} className="w-3 h-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.806 409.806"><path d="M228.929 205.01L404.596 29.343c6.78-6.548 6.968-17.352.42-24.132-6.548-6.78-17.352-6.968-24.132-.42-.142.137-.282.277-.42.42L204.796 180.878 29.129 5.21c-6.78-6.548-17.584-6.36-24.132.42-6.388 6.614-6.388 17.099 0 23.713L180.664 205.01 4.997 380.677c-6.663 6.664-6.663 17.468 0 24.132 6.664 6.662 17.468 6.662 24.132 0l175.667-175.667 175.667 175.667c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L228.929 205.01z"/></svg>
          </div>
          <div className="p-2">
            { notificationData.length? notificationData.map(notification => 
              <div onClick={() => goToRequestedPage(notification.status)} className="bg-gray-200 shadow-md border p-3 cursor-pointer rounded-md hover:bg-green-200 my-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl text-gray-700 mb-1">{ formStatusText(notification.status) }</p>
                    <p className="text-xs text-gray-700">{formatDate(notification.createdAt)}</p>
                  </div>
                </div>
                {/* <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl text-gray-700 mb-1">{ notification.message }</p>
                    <p className="text-xs text-gray-700">{formatDate(notification.createdAt)}</p>
                  </div>
                  <div>
                  <p className="text-sm text-gray-700 bg-white rounded-full px-3 py-1">{ notification.status }</p>
                  </div>
                </div> */}
              </div>
            ) : (
              <div className="m-3 bg-gray-200 p-3 rounded-md text-center">empty notification area</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
