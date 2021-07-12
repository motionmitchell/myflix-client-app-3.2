import React from "react";


class MovieCard extends React.Component {
    constructor(props) {
        super(props);
		//console.log (props);
        this.state = {
            
        }
    }
    showMovie = (id)=>{
        
		this.props.setMovieView(id);
    }
    render() {
        return (<div><ol>
            {this.props.movies.map ((movie)=>(
                <li><button onClick={()=>this.showMovie(movie.id)}>{movie.title}</button></li>
            ))}
            </ol>
        </div>);
    }

}
export default MovieCard;