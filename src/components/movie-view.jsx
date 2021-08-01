import React from "react";
import {Card, Image} from 'react-bootstrap';
class MovieView extends React.Component {
    render() {
        return (
        <div className="container">
            <Card>
                <Image src={this.props.movie.imageURL} rounded/>
                <Card.Title>{this.props.movie.description}</Card.Title>
                <Card.Body>
                    <Card.Text>Director: {this.props.movie.director.name}</Card.Text>
                    <Card.Text>Genre: {this.props.movie.genre.category}</Card.Text>
                </Card.Body>
            </Card>
        </div>);
    }
}
export default MovieView;