import React from 'react'
import './App.css';

//Dependencias
import { Link, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Navbar, NavbarBrand/*, NavItem, NavLink */ } from 'reactstrap';


//Componentes
// import Home from './components/Home';
import Signup from './components/Signup';
import GamesList from './components/GamesList';
import GamesId from './components/GamesId';
import Login from './components/Login';
import UserService from './services/UserService'
import Profile from './components/Profile';

class App extends React.Component {

  state = {
    isLogged: {},
    newUser: { username: '', password: '' },
    loggingUser: { username: '', password: '' }
  }

  service = new UserService();

  //SIGNUP CONFIG

  submitSignup = (event) => {
    event.preventDefault()
    this.service
      .signup(this.state.newUser.username, this.state.newUser.password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
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
      .then(() => {
        this.checkIfLoggedIn()
      })
      .catch((err) => {
        console.log(err);
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
        console.log(result)
        this.checkIfLoggedIn()
      })
      .catch((err) => {
        console.log(err)
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

        {this.state.isLogged._id && <Route path="/profile" render={() => <Profile isLogged={this.state.isLogged} />} />}

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

      </div>
    );
  }

}

export default App;