
import React from 'react'
import '../styles/GamesList.css'


import { Card, CardImg, CardBody, CardTitle, Badge } from 'reactstrap';
import { Form, FormGroup} from 'reactstrap';
import { Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

class GamesList extends React.Component {

    state = {
        gamesList: []
    }

    componentDidMount() {
        fetch('https://adriaproject3proxy.herokuapp.com//videogames/all')
            .then((data) => {
                return data.json()
            })
            .then((dataJSON) => {
                this.setState({ gamesList: dataJSON })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderGamesList = () => {
        return this.state.gamesList.map((games, index) => {

            return (
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
            )
        })

    }

    renderLoadingImage = () => {
        return (
            <div className="spinner">
                <Spinner color="secondary" />
            </div>
        )
    }

    handleInputChange(event) {
        window.location = '/game/' + event.target.value 
    }

    gamesGenre = () => {
        
        return (
            <div>
                <Form>
                    <FormGroup>
                        <label htmlFor="genreSelect" className="label">Select Genre</label>
                        <select type="select" name="game" id="genreSelect" onChange={this.handleInputChange}>
                            <option value="All Genres">All Genres</option>
                            <option value="Shooter">Shooter</option>
                            <option value="MMORPG">MMORPG</option>
                            <option value="MMO">MMO</option>
                            <option value="MOBA">MOBA</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Racing">Racing</option>
                            <option value="Sports">Sports</option>
                            <option value="Social">Social</option>
                            <option value="Card">Card Games</option>
                        </select>
                    </FormGroup>
                </Form>

                
            </div>
        )
    }

    render() {
        return (
            <div className="all-content">

                <h2>Free to Play Games</h2>
                <br/>
                {this.gamesGenre()}
                <div className="all-games-list">
                    {this.state.gamesList.length === 0 ? this.renderLoadingImage() : this.renderGamesList()}
                </div>

            </div>
        )
    }

}

export default GamesList






