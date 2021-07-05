import React from "react";

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            movie:this.props.movie
        }
    }
    render() {
        return (<div>
            <img src={this.props.movie.imageUrl}/>
            <p>Title: {this.props.movie.title}</p>
            <p>Description: {this.props.movie.description}</p>
            <p>Genre: {this.props.movie.genre}</p>
            <p>Director: {this.props.movie.director}</p>
        </div>);
    }
}
export default MovieCard;