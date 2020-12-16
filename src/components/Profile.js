import React from 'react'
import GameService from '../services/GameService'
import { Card, CardImg, CardBody, CardTitle, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Profile extends React.Component {

    state = {
        favoritos: [],
        favoritosFull: []
    }

    service = new GameService()

    deleteFromFavoritos= (idGame) => {

        // console.log(idGame, this.props.isLogged._id)
        
        this.service.deleteFavGame(idGame, this.props.isLogged._id)
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })
        
    }


    componentDidMount() {
        this.service.getUser(this.props.isLogged._id)
            .then((result) => {
                this.setState({ favoritos: [...result.favoritos] })
                this.getFullFavorites()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getFullFavorites = () => {
        const fav = this.state.favoritos.map((_id) => {
            return fetch(`https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/game?id=${_id}`)
                .then((data) => {
                    return data.json()
                })
                .then((dataJSON) => {
                    return dataJSON
                })
        })

        Promise.all(fav)
            .then((result) => {
                this.setState({ favoritosFull: result })
            })
    }

    renderFavorites = () => {

        return this.state.favoritosFull.map((games, index) => {
            

            return (
                <div>
                    
                    <Card className="card border-dark">
                        <Link id="card-link" to={`/games/${games.id}`} key={index}>
                            <CardImg top width="100%" src={games.thumbnail} alt={games.title} />
                            <CardBody>
                                <CardTitle id="card-title" tag="h5">{games.title}</CardTitle>
                                <div className="genre-badge">
                                    <Badge id="badge-genre">{games.genre}</Badge>
                                    
                                    {/* <Badge id="badge-genre">{games.platform}</Badge> */}
                                </div>
                            </CardBody>
                        </Link>
                        <Button color="danger" onClick={() => this.deleteFromFavoritos(games.id)} >x</Button>
                    </Card>
                    
                </div>
            )
        })
    }

    render() {

        return (
            <div className="all-content">
                <h2>Profile Page</h2>

                <div className="all-games-list">
                    {this.state.favoritosFull.length > 0 && this.renderFavorites()}
                </div>
            </div>
        )
    }

}

export default Profile