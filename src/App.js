import React from 'react'
import './App.css';

//Dependencias
import { Link, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Navbar, NavItem, NavLink } from 'reactstrap';

//Componentes
// import CreateUserForm from './components/CreateUserForm';
import Home from './components/Home';
import GamesList from './components/GamesList';

class App extends React.Component {
  
  state = {
    user: {username: '', password: ''},

  }



  submitForm = (event) => {
    event.preventDefault()

    fetch(/*'https://adriaproject3.herokuapp.com/new-user'*/'http://localhost:3000/new-user', {
      method: "POST",
      // mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    })
    .then((result)=>{
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  changeHandler = (_eventTarget) => {
    if(_eventTarget.name === 'username'){
      this.setState({user: {...this.state.user, username: _eventTarget.value}})
    } else if(_eventTarget.name === 'password'){
      this.setState({user: {...this.state.user, password: _eventTarget.value}}) 
    }
  }



  render() {
    return (
      <div className="App">
        <Navbar fixed="top">
          <Link to="/">
            <Button color="dark">Home Page</Button>
          </Link>

          <Link to="/games-list">
            <Button color="dark">Games List</Button>
          </Link>
        </Navbar>


        <Route exact path="/" component={Home} />
        <Route path="/games-list" component={GamesList} />


        {/* <CreateUserForm 
          submitForm={this.submitForm}
          user={this.state.user}
          changeHandler={this.changeHandler}
        /> */}

      </div>
    );
  }

}

export default App;
