import React from "react";
import { Container, Card, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getMovieById } from '../reducer';
class MovieView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.movieId,
            movie: {
                genre: { category: "" }, director: { id: 0, name: "", bio: "", birthYear: 1900, deathYear: 2100 }, _id: "", id: 2, description: "",
                imageURL: ""
            },
            isLoaded: false
        }
    }
    componentDidMount() {
        this.props.getMovieById({ id: this.props.movieId }).then((data) => {
            console.log("done", data);
            this.setState({ movie: data.payload.movie, isLoaded: true });

        })
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
                        <Card.Body>
                            <Card.Text>Director: <Link to={`/director/${this.state.movie.director.name}`}>{this.state.movie.director.name}</Link></Card.Text>
                            <Card.Text>Genre: <Link to={`/genre/${this.state.movie.genre.category}`}>{this.state.movie.genre.category}</Link></Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        movie: state.movie
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMovieById: id => dispatch(getMovieById(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieView)
