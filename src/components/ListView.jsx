import React from "react";
import MainCard from './MovieCard';

class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [
                {id:1, title:"Star Wars, New hope", description:"Star Wars, New hope", genre:"Sci Fi", director:"George Lucas"},
                {id:2, title:"Star Wars, empire strikes back", description:"Star Wars, empire strikes back", genre:"Sci Fi", director:"George Lucas"},
                {id:3, title:"Star Wars, return of the jedi", description:"Star Wars, return of the jedi", genre:"Sci Fi", director:"George Lucas"}
            ]
        }
    }
    showMovie = (id)=>{
        alert(id);
    }
    render() {
        return (<div><ol>
            {this.state.movies.map ((movie)=>(
                <li><button onClick={()=>this.showMovie(movie.id)}>{movie.title}</button></li>
            ))}
            </ol>
        </div>);
    }
}
export default ListView;