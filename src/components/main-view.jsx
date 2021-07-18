import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieCard from "./movie-card";
import MovieView from "./movie-view";
import LoginView from "./login-view";
import RegistrationView from "./registration-view";
import 'bootstrap/dist/css/bootstrap.css';
class MainView extends React.Component {
    constructor(props) {
        super(props);
        
		//console.log (props);
        this.state = {
            movies:[],
            movie:{"genre":{"category":"Thriller"},
            "director":{"id":3,"name":"David Fincher","bio":"Great Director","birthYear":1920,"deathYear":2014},"_id":"60dbd1642f77837d641d0e7d","id":10,"description":"Gladiator","imageURL":""},
            director:{name:"", birthYear:"", deathYear:"", bio:""},
            genre: {category:""},
            isLoaded:false,
            error:null
        }
    }
    componentDidMount(){
        fetch("http://localhost:8080/movies")
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
        document.getElementById ("divMainView").style.display = "none";
       document.getElementById ("divMovieView").style.display = "block";
    }
    showGenre = (idx)=>{

      console.log (this.state.movies[idx]);
      this.setState({genre:this.state.movies[idx].genre})
      document.getElementById ("divMainView").style.display = "none";
     document.getElementById ("divGenreView").style.display = "block";
  }
    showDirector = (idx) => {

      console.log (this.state.movies[idx]);
      this.setState({director:this.state.movies[idx].director})
      document.getElementById ("divMainView").style.display = "none";
     document.getElementById ("divDirectorView").style.display = "block";
  }
    backClick = () =>{
        document.getElementById ("divMovieView").style.display = "none";
        document.getElementById ("divMainView").style.display = "block";
    }
    render() {
        return (
          <Router>
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
              <LoginView/>
            </Route>

            <Route path="/movies">
            
            <div id='divMainView'>
            <MovieCard 
              movies={this.state.movies}
              setMovieView={this.showMovie}
             
            />
            </div>
            
        
          <div id='divMovieView' className="MovieDetail container">
            <MovieView movie={this.state.movie}/>
          <button onClick={this.backClick}>Back</button>
          </div>
           
              </Route>
            <Route path="/register">
              <RegistrationView/>
            </Route>
          </Switch>
        </Router>);
    }

}
export default MainView;