import axios from 'axios';
import authHeader from './token';

const API_URL = 'http://localhost:4000';

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

  getFormsForUser(userId, status) {
    return axios.get(API_URL + `/form/user/${userId}?status=${status}`, { headers: authHeader() })
  }
}

export default new DataService();