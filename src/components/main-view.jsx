import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieCard from "./movie-card";
import MovieView from "./movie-view";
import LoginView from "./login-view";
import DirectorView from "./director-view";
import GenreView from "./genre-view";
import RegistrationView from "./registration-view";
import 'bootstrap/dist/css/bootstrap.css';
class MainView extends React.Component {
    constructor(props) {
        super(props);
        
		//console.log (props);
    this.state = {
      movies:[],
      movie:undefined,
      director:undefined,
      genre: undefined,
      isLoaded:false,
      error:null
  }
    }
    componentDidMount(){
        fetch("https://ryanm-movies.herokuapp.com/movies")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movies: result

          });
          console.log (result[0]);
          //window.location.replace("/login");
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            alert("error");
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    }
  
    showMovie = (idx)=>{

        console.log (this.state.movies[idx]);
        this.setState({movie:this.state.movies[idx]})
       
    }
    showGenre = (idx)=>{

      console.log (this.state.movies[idx]);
      this.setState({genre:this.state.movies[idx].genre})
     
  }
    showDirector = (idx) => {

      console.log (this.state.movies[idx]);
      this.setState({director:this.state.movies[idx].director})
     
  }
    
    render() {
      if (!this.state.isLoaded) {
        return <div />
    }
        return (
          <Router>
		  <p>Version: 3.5</p>
            <div className="left20px container">	
              <a href='/login'>Login</a> | 
              <a href='/register'> Register</a> | 
              <a href='/movies'> Movies</a>
              <hr/>
            </div>
            <Switch>
            <Route exact path="/">
              
            </Route>
            <Route path="/login">
              <LoginView server={this.SERVER_ROOT_URL}/>
            </Route>

            <Route exact path="/movies">
            
            
            <MovieCard 
              movies={this.state.movies}
              setMovieView={this.showMovie}
             
            />
            </Route>
            
        
            <Route path="/movies/:movieId" 
              render={({match})=> (
                <MovieView movie={this.state.movies.find((m)=>`${m.id}`===match.params.movieId)}/>
              )}
            />
              
            <Route path="/register">
              <RegistrationView server={this.SERVER_ROOT_URL}/>
            </Route>
          </Switch>
        </Router>);
    }

}
export default MainView;