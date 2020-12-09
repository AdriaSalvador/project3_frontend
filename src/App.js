import React from 'react'
import './App.css';

//Dependencias
import { Link, Route } from 'react-router-dom';

//Componentes
import CreateUserForm from './components/CreateUserForm';
import Home from './components/Home';
import GamesList from './components/GamesList';

class App extends React.Component {
  
  state = {
    user: {username: '', password: ''}
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

  componentDidMount() {
    fetch('https://www.freetogame.com/api/games'/*,{mode:'no-cors'}*/)
    .then((data)=>{
      console.log(data)
      return data.json()
    })
    .then((dataJSON)=>{
      console.log('2')
      console.log(dataJSON)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">

        <Link to="/">Home Page</Link>
        <Link to="/games-list">Games List</Link>

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