import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import DataService from '../../services/data';
import AuthService from '../../services/auth';

function Rejected() {
  const [formData, setFormData] = useState([])

  useEffect(() => {
    getForms();
  }, []);

  const getForms = async () => {
    DataService.getFormsForUser(AuthService.getCurrentUserId(), 'rejected').then(res => {
      setFormData(res.data.data)
    })
  }

  return (
    <div>
      <Navbar/>
      <div className="p-4 min-h-screen flex justify-center items-center">
        <div className="m-2 bg-white rounded-md border p-4 shadow-md w-5/12">
          <h1 className="text-center text-gray-700 text-2xl">Rejected Forms</h1>
          <hr className="mt-3 mb-6"/>
          { formData.length? formData.map((form, i) => 
            <div key={i} className="m-3 cursor-pointer hover:bg-gray-100 bg-white rounded-md border p-4 shadow-md flex items-center">
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
    </div>
  );
}

export default Rejected;
