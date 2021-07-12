import React from "react";

import MovieCard from "./MovieCard";
import MovieView from "./MovieView";
class MainView extends React.Component {
    constructor(props) {
        super(props);
        
		//console.log (props);
        this.state = {
            movies:[
                {id:1, title:"Star Wars, New hope", description:"Star Wars, New hope", genre:"Sci Fi", 
                director:"George Lucas", imageUrl:"https://static.wikia.nocookie.net/starwars/images/c/cc/Star-wars-logo-new-tall.jpg"},
                {id:2, title:"Star Wars, empire strikes back", description:"Star Wars, empire strikes back",
                 genre:"Sci Fi", director:"George Lucas", imageUrl:"https://blog.rebelpilgrim.com/wp-content/uploads/2017/10/7773769005_star-wars.jpg"},
                {id:3, title:"Star Wars, return of the jedi", description:"Star Wars, return of the jedi", 
                genre:"Sci Fi", director:"George Lucas", imageUrl:"https://lumiere-a.akamaihd.net/v1/images/star-wars-the-rise-of-skywalker-theatrical-poster-1000_ebc74357.jpeg?region=0%2C0%2C891%2C1372&width=480"}
            ],
            movie:{}
        }
       
    }
   
    showMovie = (id)=>{
        this.setState({movie:this.state.movies[id-1]})
        document.getElementById ("divMainView").style.display = "none";
       document.getElementById ("divMovieView").style.display = "block";
    }
    backClick = () =>{
        document.getElementById ("divMovieView").style.display = "none";
        document.getElementById ("divMainView").style.display = "block";
    }
    render() {
        return (
        <div>	
            <div id='divMainView'>
		<MovieCard 
			movies={this.state.movies}
			setMovieView={this.showMovie}
		/>
		</div>
	<div id='divMovieView' className="MovieDetail">
     <MovieView movie={this.state.movie}/>
	 <button onClick={this.backClick}>Back</button>
	 </div>
        </div>);
    }

}
export default MainView;