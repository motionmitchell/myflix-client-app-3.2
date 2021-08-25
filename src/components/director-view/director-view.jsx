import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
//import { getMoviesByDirector } from '../reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './director-view.css';
class DirectorView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            director: {},
            movies: [],
            isLoaded: false,
            message: ""
        }
    }

    componentDidMount() {
        console.log("DIRNAME: ", this.props.dirName)
        axios.get(this.props.server + 'movies/director/' + this.props.dirName, {

        }).then(response => {

            console.log("DONE:", response.data);
            this.setState({
                director: response.data[0].director,
                movies: response.data, isLoaded: true
            });

        })
    }

    // fetch current user;


    render() {
        if (!this.state.isLoaded) {
            return ("<div>loading...</div>");
        }
        return (<div>
            <Container>
                <Row>
                    <Col>
                        Name: {this.state.director.name}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Birth Year: {this.state.director.birthYear}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Death Year: {this.state.director.deathYear}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Bio: {this.state.director.bio}
                    </Col>
                </Row>

                <hr />
                <h3>Movies by director:</h3>
                {this.state.movies.map((movie, idx) => (
                    <Row className="show-grid">
                        <Col className={idx % 2 === 0 ? "evenRow" : "oddRow"}>{movie.description}
                        </Col>
                        <Col className={idx % 2 === 0 ? "evenRow" : "oddRow"}>
                            {movie.director.name}

                        </Col>
                        <Col className={idx % 2 === 0 ? "evenRow" : "oddRow"}>
                            {movie.genre.category}
                        </Col>
                    </Row>
                ))}
                <div>{this.state.message}</div>
            </Container>
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(DirectorView)
