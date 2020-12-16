
import axios from "axios";


class UserService {

  constructor() {
    let service = axios.create({
      baseURL: "https://adriaproject3.herokuapp.com",
      withCredentials: true
    });


    this.service = service;
  }

  signup = (username, password) => {
    return this.service.post("/signup", { username, password })
      .then(response => response.data)
  }

  login = (username, password) => {
    // console.log('login de service')
    return this.service.post("/login", { username, password })
      .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get("/loggedin")
      .then(response => response.data)
  }

  logout = () => {
    return this.service.post("/logout", {})
      .then(response => response.data)
  }
}

export default UserService;