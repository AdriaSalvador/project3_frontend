import axios from "axios";


class GameService {

  constructor() {
    let service = axios.create({
      //baseURL: "https://adriaproject3.herokuapp.com",
      baseURL: "http://localhost:3000",
      withCredentials: true
    });


    this.service = service;
  }

  favoritos = (gameID, userID) => {
    return this.service.post("/favoritos", { gameID, userID })
      .then(response => response.data)
  }

  getUser = (userID) => {
    return this.service.get(`/getUser/${userID}`, { userID })
      .then(response => response.data)
  }

  deleteFavGame = (gameID, userID) => {
    // console.log(gameID, userID)
    // console.log('hola 2')
    return this.service.post(`/deleteFavGame/${gameID}`, { userID })
      .then(response => response.data)

  }
}

export default GameService;