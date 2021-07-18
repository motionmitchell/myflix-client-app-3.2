import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
class MovieView extends React.Component {
    constructor(props) {
        super(props);
	
        this.state={
            movie:this.props.movie
        }
    }
    render() {
        return (<div className="container">
            <img src={this.props.movie.imageURL}/>
            <p>Title: {this.props.movie.description}</p>
            <p>Description: {this.props.movie.description}</p>
            <p>Genre: {this.props.movie.genre.category}</p>
            <p>Director: {this.props.movie.director.name}</p>
        </div>);
    }
}
export default MovieView;