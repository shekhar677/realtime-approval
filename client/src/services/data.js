import axios from 'axios';
import authHeader from './token';

let API_URL;
if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:4000'
}

if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://realtime-approval.herokuapp.com'
}

class DataService {

  getDepartment(excludeDepartment) {
    return axios.get(API_URL + `/department?exclude=true&departmentId=${excludeDepartment}`, { headers: authHeader() });
  }

  getUserOfDepartment(departmentId) {
    return axios.get(API_URL + `/department/${departmentId}/users`, { headers: authHeader() })
  }

  sendRequest(formData) {
    return axios.post(API_URL + '/form/create', formData, { headers: authHeader() })
  }

  getForms(departmentId, status) {
    return axios.get(API_URL + `/form/${departmentId}?status=${status}`, { headers: authHeader() })
  }

  getFormsCreatedByUser(userId, status) {
    return axios.get(API_URL + `/form/user/${userId}?status=${status}`, { headers: authHeader() })
  }

  getFormsAssignedToUser(userId, status) {
    return axios.get(API_URL + `/form/assigned/${userId}?status=${status}`, { headers: authHeader() })
  }

  updateFormStatus(formId, status) {
    return axios.post(API_URL + `/form/${formId}/${status}`, null, { headers: authHeader() })
  }
}

export default new DataService();