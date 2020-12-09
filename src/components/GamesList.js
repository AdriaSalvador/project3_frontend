// import { render } from '@testing-library/react'
import React from 'react'
import '../styles/GamesList.css'

// import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardBody,
    CardTitle
} from 'reactstrap';

class GamesList extends React.Component {

    state = {
        gamesList: []
    }

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games')
        .then((data)=>{
          return data.json()
        })
        .then((dataJSON)=>{
          this.setState({gamesList: dataJSON})
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    
    renderGamesList = () => {
        return this.state.gamesList.map((games, index)=>{
            return(
                <div key={index}>
                    <Card className="card border-dark">
                        <CardImg top width="100%" src={games.thumbnail} alt={games.title} />
                        <CardBody>
                            <CardTitle tag="h5">{games.title}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            )
        })

    }

    renderLoadingImage = ()=>{
        return <img src="https://i.gifer.com/M99a.gif" alt="Loading"/>
    }

    render(){
        return(
            <div className="all-content">
                <h2>Games List</h2>
                <div className="all-games-list"> 
                    {this.state.gamesList.length === 0 ? this.renderLoadingImage() : this.renderGamesList()}
                </div>
                
            </div>
    ) 
    }  

}

export default GamesList