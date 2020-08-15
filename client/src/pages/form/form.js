import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import DataService from '../../services/data';
import AuthService from '../../services/auth';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const initialFormData = {
    department: '',
    assigned_to: '',
    message: ''
  }
  const [department, setDepartment] = useState([]);
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })

    if (e.target.name === 'department') {
      department.map(d => {
        if (d._id === e.target.value) {
          setUser(d.users)
        }
      })
    }
  }

  useEffect(() => {
    if (AuthService.authenticated()) {
      getDepartment();
    } else {
      logoutUser();
    }
  }, []);

  function logoutUser() {
    history.push('/login')
  }

  async function getDepartment() {
    DataService.getDepartment(AuthService.getCurrentUser().user.department).then(res => {
      let departmentData = res.data.data.filter(d => d.users.length);
      setDepartment(departmentData);
      setUser(departmentData[0].users);

      // set formData also
      setFormData({
        ...formData,
        department: departmentData[0]._id,
        assigned_to: departmentData[0].users[0]._id
      });

    }).catch(err => {
      setDepartment([])
    })
  }

  const handleForm = (e) => {
    e.preventDefault();
    let data = formData;
    
    const form = e.target;
    form.reset();

    data.created_by = AuthService.getCurrentUser().user._id;

    DataService.sendRequest(data).then(res => {

      setFormData(initialFormData);
    }).catch(err => {
      console.log('err: ',err)
    })
  }
  
  return (
    <div>
      <Navbar/>
      <div className="p-4 flex min-h-screen justify-center items-center">
        <form onSubmit={handleForm} className="w-full sm:w-1/2 lg:w-3/12">
          <div className="bg-white rounded p-6 flex flex-col shadow-md w-full">
            <div className="p-2 flex flex-col text-gray-700 mb-1">
              <label className="text-sm ml-2 mb-2 text-gray-600">Department</label>
              <select required defaultValue={'DEFAULT'} className="border rounded-md px-3 py-2 capitalize" name="department" id="department" onChange={handleChange}>
                <option value="DEFAULT" disabled>select an option</option>
                { department.map((d, index) => <option key={index} value={d._id} className="capitalize">{ d.name }</option>) }
              </select>
            </div>
            <div className="p-2 flex flex-col text-gray-700 mb-1">
              <label className="text-sm ml-2 mb-2 text-gray-600">User</label>
              <select required defaultValue={'DEFAULT'} disabled={!user.length} className="border rounded-md px-3 py-2" name="assigned_to" id="assigned_to" onChange={handleChange}>
                <option value="DEFAULT" disabled>select an option</option>
                { user.map((u, index) => <option key={index} value={u._id}>{ u.email }</option>) }
              </select>
            </div>
            <div className="p-2 flex flex-col text-gray-700 mb-1">
              <label className="text-sm ml-2 mb-1 text-gray-600">Message</label>
              <textarea disabled={!user.length} required name="message" id="message" rows="3" placeholder="Your message.." onInput={handleChange} className="resize-none rounded-md px-3 py-2 border"></textarea>
            </div>
            <button className="px-3 py-2 m-2 mt-4 bg-green-400 shadow-md rounded-md text-white font-weight-bold hover:bg-green-500">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
