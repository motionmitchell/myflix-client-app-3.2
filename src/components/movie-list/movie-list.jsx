import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
//import { getMovieList, addToFavorites } from '../reducer';
import VisibilityFilterInput from "../visibility-filter-input/VisibilityFilterInput";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import './movie-list.css';
class MovieCard extends React.Component {
    constructor(props) {
        super(props);

        console.log("constructor", props)
        this.state = {
            movies: this.props.movies,
            filteredMovies: this.props.movies,
            movie: null,
            isLoaded: true,
            error: null,
            visibilityFilter: "",
            message: ""
        }
        console.log("loaded");

    }
    componentDidMount() {
        console.log(this.props);

    }
    setMessage = (msg) => {
        this.setState({ message: msg });
    }
    setFilter = (val) => {
        // alert(val);
        const value = (val + "").toLowerCase();
        this.setState({ filteredMovies: this.state.movies.filter(m => m.description.toLowerCase().indexOf(value) > -1) });
    }
    addToFavorites = async (id) => {
        const resp = await axios.get(this.props.server + 'user/movie/add/' + id);
        console.log(resp);
        this.setState({ message: resp.data.message });

    }

    render() {
        if (!this.state.isLoaded) {
            return (<div>loading...</div>);
        }
        return (
            <div>

                <Container>
                    <VisibilityFilterInput setFilter={this.setFilter} visibilityFilter={this.visibilityFilter} />
                    <hr />
                    <Row className="show-grid" key="id">
                        <Col><h4>Title</h4>
                        </Col>
                        <Col>
                            <h4>Director Name</h4>
                        </Col>
                        <Col>
                            <h4>Genre</h4>
                        </Col>
                        <Col>
                            <h4>Add to Favorites</h4>
                        </Col>
                    </Row>
                    {this.state.filteredMovies.map((movie, idx) => (
                        <Row className="show-grid" key="id">
                            <Col className={idx % 2 === 0 ? "evenRow" : "oddRow"}>
                                <Link className={idx % 2 === 0 ? "evenRow" : "oddRow"} to={`/movies/${idx}`}>{movie.description}</Link>
                            </Col>
                            <Col className={idx % 2 === 0 ? "evenRow" : "oddRow"}>
                                {movie.director.name}
                            </Col>
                            <Col className={idx % 2 === 0 ? "evenRow" : "oddRow"}>
                                {movie.genre.category}
                            </Col>
                            <Col className={idx % 2 === 0 ? "evenRow" : "oddRow"}>
                                <Link className={idx % 2 === 0 ? "evenRow" : "oddRow"} onClick={() => this.addToFavorites(movie.id)}>
                                    Add</Link>
                            </Col>
                            <br />
                        </Row>
                    ))}
                    <div>{this.state.message}</div>
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

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(MovieCard)
