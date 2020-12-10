import React from 'react'

import '../styles/GamesId.css'

import { Spinner } from 'reactstrap';

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

    stateImages = ()=>{
        return this.state.gamesInfo.screenshots.map((images, index)=>{
            return(
                <img src={images.image} alt={this.state.gamesInfo.title} key={index} />
            )
        })
    }

    minimumRequirements = ()=>{
        
            return(
                <div>
                    <p>{this.state.gamesInfo.minimum_system_requirements.graphics}</p>
                    <p>{this.state.gamesInfo.minimum_system_requirements.memory}</p>
                    <p>{this.state.gamesInfo.minimum_system_requirements.os}</p>
                    <p>{this.state.gamesInfo.minimum_system_requirements.processor}</p>
                    <p>{this.state.gamesInfo.minimum_system_requirements.storage}</p>
                </div>
                
            )
        
    }

    renderLoadingImage = ()=>{
        return (
            <div className="spinner">
                <Spinner color="secondary" />
            </div>
        ) 
    }
    
    

    render(){
        // console.log(this.state.gamesInfo.minimum_system_requirements)
        return(
            <div className="all-content">
                
                <img src={this.state.gamesInfo.thumbnail} alt={this.state.gamesInfo.title} />
                <h2>{this.state.gamesInfo.title}</h2>
                {this.state.gamesInfo.genre}
                <br/>
                {this.state.gamesInfo.platform}
                <br/>
                {this.state.gamesInfo.description}
                <br/>
                {this.state.gamesInfo.developer}
                <br/>
                {this.state.gamesInfo.game_url}
                <br/>
                {this.state.gamesInfo.length === 0 ? this.renderLoadingImage() : this.minimumRequirements()}
                {this.state.gamesInfo.length === 0 ? this.renderLoadingImage() : this.stateImages()}

            </div>
        )
    }
}

export default GamesId