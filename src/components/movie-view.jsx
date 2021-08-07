import React from "react";
import {Card, Image} from 'react-bootstrap';
import {Link} from "react-router-dom";
class MovieView extends React.Component {
  
    render() {
        return (
        <div className="container">
              <Card>
                <Image src={this.props.movie.imageURL} rounded/>
                <Card.Title>{this.props.movie.description}</Card.Title>
                <Card.Body>
                    <Card.Text>Director: <Link to={`/director/${this.props.movie.director.name}`}>{this.props.movie.director.name}</Link></Card.Text>
                    <Card.Text>Genre: <Link to={`/genre/${this.props.movie.genre.category}`}>{this.props.movie.genre.category}</Link></Card.Text>
                </Card.Body>
            </Card>
        </div>);
    }
}
export default MovieView;