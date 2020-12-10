import React from 'react'

import '../styles/GamesId.css'

import {
    Card, CardImg, CardBody,
    CardTitle, Badge
} from 'reactstrap';

class GamesId extends React.Component {

    state = {
        gamesInfo: []
    }

    componentDidMount(){
        fetch(`https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/game?id=${this.props.match.params.id}`)
        .then((data)=>{
            return data.json()
        })
        .then((dataJSON)=>{
            this.setState({gamesInfo: dataJSON})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className="all-content">
                <h2>{this.state.gamesInfo.title}</h2>

                <Card className="card border-dark">
                    
                        <CardImg id="card-image" src={this.state.gamesInfo.thumbnail} alt={this.state.gamesInfo.title} />
                        
                        <CardBody>
                            <CardTitle id="card-title"tag="h5">{this.state.gamesInfo.title}</CardTitle>
                            <div className="genre-badge">
                                <Badge id="badge-genre">{this.state.gamesInfo.genre}</Badge>
                                <Badge id="badge-genre">{this.state.gamesInfo.platform}</Badge>
                            </div>
                        </CardBody>
                    
                </Card>
                    
                {/* <h2>{this.props.match.params.id}</h2> */}
            </div>
        )
    }
}

export default GamesId