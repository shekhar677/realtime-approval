import axios from "axios";

const API_URL = "http://localhost:4000";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/user/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password, department) {
    return axios.post(API_URL + "/user/signup", {
      email,
      password,
      department
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('user')).user._id;
  }

  getCurrentDepartmentId() {
    return JSON.parse(localStorage.getItem('user')).user.department;
  }

  authenticated() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return true
    } else {
      return false
    }
  }
}

export default new AuthService();