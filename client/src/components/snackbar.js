import React, { useEffect, useState } from 'react';

function Snackbar(props) {
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    setNotify(props.status);
    setTimeout(() => {
      setNotify(false)
    }, 8000)
  }, [props]);
  
  function closeSnackbar() {
    setNotify(false)
  }

  if (notify) {
    return (
      <div className="select-none z-10 fixed flex justify-center w-full" style={{bottom:'2rem'}}>
        <div className="flex items-center bg-green-400 p-3 px-6 mx-2 rounded-lg">
          <p className="font-medium">you have received a notification</p>
          <div onClick={closeSnackbar} className="ml-4 p-2 cursor-pointer bg-green-600 rounded-full flex jsutify-center items-center">
            <svg style={{fill:'white'}} className="w-3 h-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.806 409.806"><path d="M228.929 205.01L404.596 29.343c6.78-6.548 6.968-17.352.42-24.132-6.548-6.78-17.352-6.968-24.132-.42-.142.137-.282.277-.42.42L204.796 180.878 29.129 5.21c-6.78-6.548-17.584-6.36-24.132.42-6.388 6.614-6.388 17.099 0 23.713L180.664 205.01 4.997 380.677c-6.663 6.664-6.663 17.468 0 24.132 6.664 6.662 17.468 6.662 24.132 0l175.667-175.667 175.667 175.667c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L228.929 205.01z"/></svg>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Snackbar;