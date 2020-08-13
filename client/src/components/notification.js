import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

function Navbar() {
  const [notification, setNotification] = useState(true);
  const ENDPOINT = "http://localhost:4000";

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("5f3179a90f599452e0122d33", data => {
      setNotification(false);
    });

    return () => socket.disconnect();
  });

  const [data, setData] = useState('no data');

  useEffect(() => {
    fetch("http://localhost:4000/form")
      .then(response => response.json())
      .then(data => setData(data.data.length));
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      notifyIcon
    </div>
  );
}

export default Navbar;
