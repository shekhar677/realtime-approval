import React from 'react';

function Loader(props) {
  if (props.status) {
    return (
      <div className="select-none z-10 fixed inset-0 flex justify-center items-center" style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
        <div className="w-64 bg-white rounded-lg border py-4 px-2 flex items-center justify-around">
          <div className="spinner"></div>
          <p className="text-gray-700 text-xl">Please wait...</p>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Loader;