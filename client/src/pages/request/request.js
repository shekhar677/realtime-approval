import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/navbar';
import DataService from '../../services/data';
import AuthService from '../../services/auth';

function Request() {
  const history = useHistory();
  const [formData, setFormData] = useState([]);
  const [modal, setModal] = useState(false);
  const [formId, setFormId] = useState('');

  useEffect(() => {
    getForms();
    if (!AuthService.authenticated()) {
      logoutUser();
    }
  }, []);

  function logoutUser() {
    history.push('/login')
  }

  const getForms = async () => {
    DataService.getFormsAssignedToUser(AuthService.getCurrentUserId(), 'pending').then(res => {
      setFormData(res.data.data)
    })
  }

  const openDialog = (id) => {
    setFormId(id)
    setModal(true)
  }

  const closeDialog = () => {
    setModal(false)
  }

  const updateStatus = (status) => {
    DataService.updateFormStatus(formId, status).then(res => {
      console.log('approved: ',res.data)
      getForms();
    }).catch(err => {
      console.log('faied to: ',err)
    })
  }

  return (
    <div>
      <Navbar/>
      <div className="p-4 min-h-screen flex justify-center items-center">
        <div className="m-2 bg-white rounded-md border p-4 shadow-md w-5/12">
          <h1 className="text-center text-gray-700 text-2xl">Request For Approval</h1>
          <hr className="mt-3 mb-6"/>
          { formData.length? formData.map((form, i) => 
            <div key={i} onClick={ () => openDialog(form._id) } className="m-3 cursor-pointer hover:bg-green-200 bg-white rounded-md border p-4 shadow-md flex items-center">
              <div className="w-16 h-16 rounded-full bg-gray-400 text-white text-4xl flex justify-center items-center uppercase mr-4">{form.created_by.email.split("")[0]}</div>
              <div>
                <div className="text-gray-700 flex w-full mb-1">
                  <div className="text-sm mr-1 w-20">message :</div>
                  <div className="capitalize text-sm">{ form.message }</div>
                </div>
                <div className="text-gray-700 flex w-full mb-1">
                  <div className="text-sm mr-1 w-20">department :</div>
                  <div className="capitalize text-sm">{ form.department.name }</div>
                </div>
                <div className="text-gray-700 flex w-full mb-1">
                  <div className="text-sm mr-1 w-20">created by :</div>
                  <div className="text-sm">{ form.created_by.email }</div>
                </div>
                <div className="text-gray-700 flex w-full mb-1">
                  <div className="text-sm mr-1 w-20">status :</div>
                  <div className="capitalize text-sm">{ form.status }</div>
                </div>
                <div className="text-gray-700 flex w-full mb-1">
                  <div className="text-sm mr-1 w-20">date :</div>
                  <div className="capitalize text-sm">{ new Date(form.createdAt).toDateString() }</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="m-3 bg-white rounded-md border p-6 shadow-md text-center">No data</div>
          )}
        </div>
      </div>

      <div onClick={closeDialog} className="bg-red-600 p-4 fixed inset-0 flex h-screen justify-center items-center" style={{ display: modal? "flex" : "none", background: 'rgba(0,0,0,0.7)' }}>
        <div className="bg-white rounded-md border p-4 px-6">
          <div className="flex mb-5">
            <div className="spacer"></div>
            <svg onClick={closeDialog} className="w-3 h-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.806 409.806"><path d="M228.929 205.01L404.596 29.343c6.78-6.548 6.968-17.352.42-24.132-6.548-6.78-17.352-6.968-24.132-.42-.142.137-.282.277-.42.42L204.796 180.878 29.129 5.21c-6.78-6.548-17.584-6.36-24.132.42-6.388 6.614-6.388 17.099 0 23.713L180.664 205.01 4.997 380.677c-6.663 6.664-6.663 17.468 0 24.132 6.664 6.662 17.468 6.662 24.132 0l175.667-175.667 175.667 175.667c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L228.929 205.01z"/></svg>
          </div>
          <p className="text-gray-700 text-xl font-semibold mb-6">Do you want to Approve this request?</p>
          <div className="my-3 flex justify-center">
            <button onClick={() => updateStatus('approved')} className="bg-green-300 px-4 py-2 rounded-md text-gray-700 mr-3 hover:bg-green-400 hover:text-white">Approve</button>
            <button onClick={() => updateStatus('rejected')} className="bg-red-300 px-4 py-2 rounded-md text-gray-700 hover:bg-red-400 hover:text-white">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request;
