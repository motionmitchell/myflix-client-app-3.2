import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MovieCard from "./movie-card";
import MovieView from "./movie-view";
import LoginView from "./login-view";
import RegistrationView from "./registration-view";
import 'bootstrap/dist/css/bootstrap.css';
require('dotenv').config();
class MainView extends React.Component {
    constructor(props) {
        super(props);
      
        this.SERVER_ROOT_URL = "https://ryanm-movies.herokuapp.com/";
        
        this.state = {
            movies:[],
            movie:undefined,
            director:undefined,
            genre: undefined,
            isLoaded:false,
            error:null
        }

    }
	  

    //if ((this.SERVER_BASE_URL+"").length <4 || SERVER_BASE_URL.charAt(0)!=='h')
    
    
    //SERVER_BASE_URL="http://localhost:8080/";
 componentDidMount(){
  this.loadData();
 }
    loadData(){
    //  alert(this.SERVER_BASE_URL);
        fetch("https://ryanm-movies.herokuapp.com/movies")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movies: result
          });
          console.log (result[0]);
         // alert("did mount");
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
            <div>version: 3.6</div>
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