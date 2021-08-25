import React from "react";
//import { getMoviesByGenre } from '../reducer';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './genre-view.css';
class GenreView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            genre: this.props.genre,
            movies: [],
            isLoaded: false,
            message: ""
        }
    }
    componentDidMount() {
        axios.get(this.props.server + 'movies/genre/' + this.props.genre, {

        }).then(response => {

            console.log("DONE:", response.data);
            this.setState({
                genre: response.data[0].genre,
                movies: response.data, isLoaded: true
            });

        })

    }
    render() {
        if (!this.state.isLoaded) {
            return ("<div>loading...</div>");
        }
        return (<div>

            <Container>
                <Row><Col>Genre: {this.state.genre.category}</Col></Row>
                <hr />
                <h4>Movies for this Genre:</h4>
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
/*
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMoviesByGenre: name => dispatch(getMoviesByGenre(name))
    }
}
*/
export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(GenreView)
