import React from "react";
import { getMoviesByGenre } from '../reducer';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

class GenreView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            genre: this.props.genre,
            movies: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        this.props.getMoviesByGenre({ genre: this.props.genre }).then((data) => {
            console.log("done", data);
            this.setState(
                {
                    genre: data.payload.movies[0].genre,
                    movies: data.payload.movies,
                    isLoaded: true
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
                {this.state.movies.map((movie, idx) => (
                    <Row className="show-grid">
                        <Col className='btn-light'>{movie.description}
                        </Col>
                        <Col className='btn-light'>
                            {movie.director.name}

                        </Col>
                        <Col className='btn-light'>
                            {movie.genre.category}
                        </Col>
                    </Row>
                ))}
            </Container>

        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMoviesByGenre: name => dispatch(getMoviesByGenre(name))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenreView)
