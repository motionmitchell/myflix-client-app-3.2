import React from "react";
import { Container, Card, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
//import { getMovieById } from '../reducer';
class MovieView extends React.Component {
    constructor(props) {
        super(props);
        console.log("mv.load: ", props);
        this.state = {
            id: 0,
            movie: [],
            isLoaded: false,
            message: ""
        }
    }
    componentDidMount() {
        this.setState({ movie: this.props.movies[parseInt(this.props.movieId)], isLoaded: true });
    }

    render() {
        if (!this.state.isLoaded) {
            return (<div />)
        }
        return (
            <div>
                <Container>
                    <Card>
                        <Image src={this.state.movie.imageURL} rounded />
                        <Card.Title>{this.state.movie.description}</Card.Title>
                        <Card.Body >
                            <Card.Text>Director: <Link to={`/director/${this.state.movie.director.name}`}>{this.state.movie.director.name}</Link></Card.Text>
                            <Card.Text>Genre: <Link to={`/genre/${this.state.movie.genre.category}`}>{this.state.movie.genre.category}</Link></Card.Text>
                        </Card.Body>
                    </Card>
                    <div>{this.state.message}</div>
                </Container>
            </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        movie: state.movie
    }
}
/*
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMovieById: id => dispatch(getMovieById(id))
    }
}
*/
export default connect(
    mapStateToProps,
    //  mapDispatchToProps
)(MovieView)
