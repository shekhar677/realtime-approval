import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/navbar';
import DataService from '../../services/data';
import AuthService from '../../services/auth';

function Rejected() {
  const history = useHistory();
  const [formData, setFormData] = useState([])

  useEffect(() => {
    if (!AuthService.authenticated()) {
      logoutUser();
    } else {
      getForms();
    }
  }, []);

  function logoutUser() {
    history.push('/login')
  }

  const getForms = async () => {
    DataService.getFormsCreatedByUser(AuthService.getCurrentUserId(), 'rejected').then(res => {
      setFormData(res.data.data)
    })
  }

  return (
    <div>
      <Navbar/>
      <div className="p-4 min-h-screen flex justify-center items-center">
        <div className="bg-white rounded-md border p-4 shadow-md m-2 w-full md:w-5/12">
          <h1 className="text-center text-gray-700 text-2xl">Rejected Forms</h1>
          <hr className="mt-3 mb-6"/>
          { formData.length? formData.map((form, i) => 
            <div key={i} className="cursor-pointer hover:bg-gray-100 bg-white rounded-md border p-4 shadow-md my-2 flex items-center">
              <div className="hidden md:flex w-16 h-16 rounded-full bg-gray-400 text-white text-4xl flex justify-center items-center uppercase mr-4">{form.created_by.email.split("")[0]}</div>
              <div>
                <div className="text-gray-700 flex flex-col md:flex-row w-full mb-1">
                  <div className="text-sm mr-1 w-full md:w-24 font-medium">message :</div>
                  <div className="capitalize text-sm">{ form.message }</div>
                </div>
                <div className="text-gray-700 flex flex-col md:flex-row w-full mb-1">
                  <div className="text-sm mr-1 w-full md:w-24 font-medium">department :</div>
                  <div className="capitalize text-sm">{ form.department.name }</div>
                </div>
                <div className="text-gray-700 flex flex-col md:flex-row w-full mb-1">
                  <div className="text-sm mr-1 w-full md:w-24 font-medium">created by :</div>
                  <div className="text-sm">{ form.created_by.email }</div>
                </div>
                <div className="text-gray-700 flex flex-col md:flex-row w-full mb-1">
                  <div className="text-sm mr-1 w-full md:w-24 font-medium">status :</div>
                  <div className="capitalize text-sm">{ form.status }</div>
                </div>
                <div className="text-gray-700 flex flex-col md:flex-row w-full mb-1">
                  <div className="text-sm mr-1 w-full md:w-24 font-medium">date :</div>
                  <div className="capitalize text-sm">{ new Date(form.createdAt).toDateString() }</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="m-3 bg-white rounded-md border p-6 shadow-md text-center">No data</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rejected;
