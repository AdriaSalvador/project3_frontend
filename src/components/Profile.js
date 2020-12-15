import React from 'react'
import GameService from '../services/GameService'
import { Card, CardImg, CardBody, CardTitle, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

class Profile extends React.Component {

    state = {
        favoritos: [],
        favoritosFull: []
    }

    service = new GameService()

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
                    <Link id="card-link" to={`/games/${games.id}`} key={index}>
                        <Card className="card border-dark">
                            <CardImg top width="100%" src={games.thumbnail} alt={games.title} />
                            <CardBody>
                                <CardTitle id="card-title" tag="h5">{games.title}</CardTitle>
                                <div className="genre-badge">
                                    <Badge id="badge-genre">{games.genre}</Badge>
                                    <Badge id="badge-genre">{games.platform}</Badge>
                                </div>
                            </CardBody>
                        </Card>
                    </Link>
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