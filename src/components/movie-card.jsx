import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getMovieList } from '../reducer';
import 'bootstrap/dist/css/bootstrap.css';

class MovieCard extends React.Component {
    constructor(props) {
        super(props);

        //  this.SERVER_ROOT_URL = "https://ryanm-movies.herokuapp.com/";

        this.state = {
            movies: this.props.movies,
            movie: null,
            isLoaded: false,
            error: null
        }
        console.log("loaded");

    }
    componentDidMount() {
        this.props.getMovieList().then((data) => {
            console.log("done", data);
            this.setState({ movies: data.payload.movies, isLoaded: true });

        })
        // this.setState({ movies: this.props.movies, isLoaded: true });
    }

    showMovie = (id) => {

        alert(this.state.movies[id]);

    }
    loadData = () => {
        alert("loadData");
    }
    render() {
        if (!this.state.isLoaded) {
            return (<div>loading...</div>);
        }
        return (

            <div>
                <Container>
                    {this.state.movies.map((movie, idx) => (
                        <Row className="show-grid" key="id">
                            <Col className='btn-light'><Link to={`/movies/${movie.id}`}>{movie.description}</Link>
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
    console.log("mapStateToProps.movies:", state.movies);
    return {
        movies: state.movies
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const getMovies = () => dispatch(getMovieList());
    return {
        getMovieList: getMovies
    }

    // console.log("mapDispatchToProps",getMovies);

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieCard)
