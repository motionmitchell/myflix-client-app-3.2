import React from "react";
import {Card, Image} from 'react-bootstrap';
class MovieView extends React.Component {
  
    render() {
        return (
        <div className="container">
              <Card>
                <Image src={this.state.movie.imageURL} rounded/>
                <Card.Title>{this.state.movie.description}</Card.Title>
                <Card.Body>
                    <Card.Text>Director: {this.state.movie.director.name}</Card.Text>
                    <Card.Text>Genre: {this.state.movie.genre.category}</Card.Text>
                </Card.Body>
            </Card>
        </div>);
    }
}
export default MovieView;