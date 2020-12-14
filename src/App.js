import React from 'react'
import './App.css';

//Dependencias
import { Link, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Navbar/*, NavItem, NavLink */ } from 'reactstrap';

//Componentes
import Signup from './components/Signup';
// import Home from './components/Home';
import GamesList from './components/GamesList';
import GamesId from './components/GamesId';
import Login from './components/Login';
import UserService from './services/UserService'

class App extends React.Component {

  state = {
    isLogged: {},
    newUser: { username: '', password: '' },
    loggingUser: {username: '', password: ''}
  }

  service = new UserService();

  //SIGNUP CONFIG

  submitSignup = (event) => {
    event.preventDefault()
    this.service
    .signup(this.state.newUser.username, this.state.newUser.password)
    .then((result)=>{
      console.log(result);
    })
    .catch((err)=>{
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
      .then(()=>{
        this.checkIfLoggedIn()
      })
      .catch((err)=>{
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

  checkIfLoggedIn = ()=>{
    this.service.loggedin()
    .then((result)=>{
      this.setState({isLogged: result})
    })
  }

  logOut = ()=>{
    this.service.logout()
    .then((result)=>{
      console.log(result)
      this.checkIfLoggedIn()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  componentDidMount(){
    this.checkIfLoggedIn();
  }


  render() {
    return (
      <div className="App">
        <Navbar fixed="top">

          <Link to="/">
            <Button color="dark">Home Page</Button>
          </Link>

          <Link to="/signup">
            <Button color="dark">Sign Up</Button>
          </Link>

          <Link to="/login">
            <Button color="dark">Log In</Button>
          </Link>

          <Link to="/logout">
            <Button color="dark" onClick={this.logOut}>Log Out</Button>
          </Link>

        </Navbar>


        {/* <Route path="/games-list" component={GamesList} /> */}
        <Route exact path="/" component={GamesList} />
        <Route path="/:id" component={GamesId} />
        <Route path="/signup" render={()=>
          <Signup 
            submitSignup={this.submitSignup}
            newUser={this.state.newUser}
            changeHandlerSignup={this.changeHandlerSignup}
          />
        } />
        <Route path="/login" render={()=>
          <Login 
            submitLogin={this.submitLogin}
            loggingUser={this.state.loggingUser}
            changeHandlerLogin={this.changeHandlerLogin}
          />
        } />
         

      </div>
    );
  }

}

export default App;