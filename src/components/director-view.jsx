import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { getMoviesByDirector } from '../reducer';
import { connect } from 'react-redux';
class DirectorView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            director: this.props.director,
            movies: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        this.props.getMoviesByDirector({ name: this.props.dirName }).then((data) => {
            console.log("done", data);
            this.setState({
                director: data.payload.movies[0].director,
                movies: data.payload.movies, isLoaded: true
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


                {this.props.movies.map((movie, idx) => (
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
        getMoviesByDirector: name => dispatch(getMoviesByDirector(name))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DirectorView)
