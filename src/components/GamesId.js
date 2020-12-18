import React from 'react'

import '../styles/GamesId.css'

import { Spinner } from 'reactstrap';
import { Button } from 'reactstrap';
import { Badge } from 'reactstrap';
import { Alert } from 'reactstrap';
// import { UncontrolledCarousel } from 'reactstrap';

import GameService from '../services/GameService';



class GamesId extends React.Component {

    state = {
        gamesInfo: [],
        visible : false
    }

    service = new GameService()

    addToFavoritos = () => {
        // console.log(this.props.match.params.id, this.props.isLogged._id)
        this.service.favoritos(this.props.match.params.id, this.props.isLogged._id)
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    componentDidMount() {
        fetch(`https://adria-proxy.herokuapp.com/videogames/${this.props.match.params.id}`)
            .then((data) => {
                return data.json()
            })
            .then((dataJSON) => {
                this.setState({ gamesInfo: dataJSON })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    stateImages = () => {
        // console.log(this.state.gamesInfo.screenshots)
        const items = this.state.gamesInfo.screenshots
        // return (
        // <UncontrolledCarousel items={items} />)
        return items.map((images, index) => {
            return (
                 
                <img src={images.image} alt={this.state.gamesInfo.title} key={index} />
            )
        })
    }

    minimumRequirements = () => {

        return (
            <div className="row">
                <div className="col-sm-6" id="column-requirement">
                    <h5>Graphics</h5>
                    <p>{this.state.gamesInfo.minimum_system_requirements.graphics}</p>
                    <h5>Memory</h5>
                    <p>{this.state.gamesInfo.minimum_system_requirements.memory}</p>
                    <h5>OS</h5>
                    <p>{this.state.gamesInfo.minimum_system_requirements.os}</p>
                </div>
                
                <div className="col-sm-6" id="column-requirement">
                    <h5>Processor</h5>
                    <p>{this.state.gamesInfo.minimum_system_requirements.processor}</p>
                    <h5>Storage</h5>
                    <p>{this.state.gamesInfo.minimum_system_requirements.storage}</p>
                </div>
            </div>

        )

    }

    renderLoadingImage = () => {
        return (
            <div className="spinner">
                <Spinner color="secondary" />
            </div>
        )
    }

    buttonClick = () => {
        const url = this.state.gamesInfo.game_url
        window.open(url)
    }

    favouriteClickAlertAndAdd = () =>{
        this.addToFavoritos()
        this.onShowAlert()
    }

    favouriteClick = () => {
        if (this.props.isLogged.username) {
            return (
                <div>
                    <Button id="favourite-button" color="dark" onClick={() => this.favouriteClickAlertAndAdd()}>Add to Favorites</Button>
                </div>
            )
        }
    }

    onShowAlert = ()=>{
        this.setState({visible:true},()=>{
          window.setTimeout(()=>{
            this.setState({visible:false})
          },2000)
        });
    }

    render() {

        return (

            <div className="all-content">
                <div className="individual-game-container">

                    <div className="title-image">
                        <h2>{this.state.gamesInfo.title}</h2>
                        <img src={this.state.gamesInfo.thumbnail} alt={this.state.gamesInfo.title} />

                        <div className="genre-platform">
                            <Badge id="genre">{this.state.gamesInfo.genre}</Badge>
                            <Badge id="genre">{this.state.gamesInfo.platform}</Badge>
                        </div>

                        <div className="buttons">
                            {this.favouriteClick()}
                            <Button id="playGame-button" color="dark" onClick={this.buttonClick}>Play Game</Button>
                        </div>
                        <div className="alerta">
                            <Alert color="info" isOpen={this.state.visible} >
                                Game added to favorites
                            </Alert>
                        </div>
                    </div>


                    <div className="info-game">
                        <div className="description">
                            <h2>Description</h2>
                            <hr />
                            {this.state.gamesInfo.description}
                            <hr />
                        </div>

                        <div className="requirements">
                            <h2>Minimum System Requirements</h2>
                            <hr />
                            {this.state.gamesInfo.length === 0 ? this.renderLoadingImage() : this.minimumRequirements()}
                            <hr />
                        </div>

                        <div className="screenshots">
                            <h2>{this.state.gamesInfo.title} Screenshots</h2>
                            <hr />
                            {this.state.gamesInfo.length === 0 ? this.renderLoadingImage() : this.stateImages()}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default GamesId