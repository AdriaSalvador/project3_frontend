import React from 'react'
import './App.css';

//Dependencias
import { Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Navbar, NavbarBrand/*, NavItem, NavLink */ } from 'reactstrap';
import { Alert } from 'reactstrap';

//Componentes
// import Home from './components/Home';
import Signup from './components/Signup';
import GamesList from './components/GamesList';
import GamesId from './components/GamesId';
import Login from './components/Login';
import UserService from './services/UserService'
import Profile from './components/Profile';
import GamesGenre from './components/GamesGenre';

class App extends React.Component {

  state = {
    isLogged: {},
    newUser: { username: '', password: '' },
    loggingUser: { username: '', password: '' },
    visible: false,
    message: ''
  }

  service = new UserService();

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false })
      }, 2000)
    });
  }

  //SIGNUP CONFIG

  submitSignup = (event) => {
    event.preventDefault()
    this.service
      .signup(this.state.newUser.username, this.state.newUser.password)
      .then((result) => {
        this.setState({ isLogged: result, message: 'Logged In' })
        this.onShowAlert()
      })
      .catch((err) => {
        this.setState({message: err.response.data.message});
        this.onShowAlert()
      });

  }

  changeHandlerSignup = (_eventTarget) => {
    if (_eventTarget.name === 'username') {
      this.setState({ newUser: { ...this.state.newUser, username: _eventTarget.value } })
    } else if (_eventTarget.name === 'password') {
      this.setState({ newUser: { ...this.state.newUser, password: _eventTarget.value } })
    }
  }

  //LOGIN CONFIG

  submitLogin = (event) => {
    event.preventDefault()
    this.service
      .login(this.state.loggingUser.username, this.state.loggingUser.password)
      .then((response) => {

        this.setState({ isLogged: response, message: 'Logged In' })
        // this.checkIfLoggedIn()
        this.onShowAlert()
      })
      .catch((err) => {
        this.setState({message: err.response.data.message});
        this.onShowAlert()
      });
  }

  changeHandlerLogin = (_eventTarget) => {
    if (_eventTarget.name === 'username') {
      this.setState({ loggingUser: { ...this.state.loggingUser, username: _eventTarget.value } })
    } else if (_eventTarget.name === 'password') {
      this.setState({ loggingUser: { ...this.state.loggingUser, password: _eventTarget.value } })
    }
  }

  //LOGOUT CONFIG

  logOut = () => {
    this.service.logout()
      .then((result) => {
        this.setState({message: 'Correctly disconnected' })
        this.onShowAlert()
        this.checkIfLoggedIn()
        
      })
      .catch((err) => {
        this.setState({message: err.response.data.message});
        this.onShowAlert()
      })
  }

  //LOGGEDIN

  checkIfLoggedIn = () => {
    this.service.loggedin()
      .then((result) => {
        this.setState({ isLogged: result })
      })
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  //AUTH NAVBAR BUTTONS

  renderButtons = () => {

    if (this.state.isLogged.username) {
      return (

        <div>

          <span>{`Welcome, ${this.state.isLogged.username} `}</span>
          <Link to="/profile">
            <Button color="dark" className="mr-2 ml-2">Profile</Button>
          </Link>
          <Link to="/logout">
            <Button color="dark" onClick={this.logOut} className="mr-2">Log Out</Button>
          </Link>

        </div>
      )
    } else {
      return (

        <div className="navButtons">

          <Link to="/signup">
            <Button color="dark" className="mr-2">Sign Up</Button>
          </Link>

          <Link to="/login">
            <Button color="dark" className="mr-2">Log In</Button>
          </Link>

        </div>
      )
    }
  }

  //RENDER

  render() {

    return (

      <div className="App">

        <Navbar fixed="top">
          <div className="navButtons">
            <NavbarBrand>
              <img
                src="/logo.png"
                width="123"
                height="30"
                className="d-inline-block align-center"
                alt="React Bootstrap logo"
              />
            </NavbarBrand >

            <Link to="/">
              <Button color="dark">Home Page</Button>
            </Link>
          </div>
          <div className="alerta">
            <Alert className="m-1 p-1" color="info" isOpen={this.state.visible} >
              {this.state.message}
            </Alert>
          </div>
          {this.renderButtons()}
        </Navbar>

        <Route exact path="/" component={GamesList} />

        <Route
          path="/signup"
          render={() => (
            !this.state.isLogged.username
              ? <Signup submitSignup={this.submitSignup} newUser={this.state.newUser} changeHandlerSignup={this.changeHandlerSignup} />
              : <Redirect to='/' />
          )} />

        <Route
          path="/login"
          render={(props) => (
            !this.state.isLogged.username
              ? <Login submitLogin={this.submitLogin} loggingUser={this.state.loggingUser} changeHandlerLogin={this.changeHandlerLogin} />
              : <Redirect to='/' />
          )} />

        {this.state.isLogged._id && <Route path="/profile" render={(props) => <Profile {...props} isLogged={this.state.isLogged} />} />}

        <Route
          path="/logout"
          render={() => (
            this.state.isLogged.username
              ? <Redirect to='/' />
              : <Redirect to='/' />
          )} />

        <Route
          path="/games/:id"
          render={(props) => {
            return (
              <GamesId {...props} isLogged={this.state.isLogged} />
            )
          }} />

        <Route
          path="/game/:genre"
          render={(props) => {
            return (
              <GamesGenre {...props} isLogged={this.state.isLogged} />
            )
          }} />

      </div>
    );
  }

}

export default App;