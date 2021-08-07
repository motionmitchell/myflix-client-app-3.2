import React from "react";
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


import { navigate } from "@reach/router"
import MovieCard from "./movie-card";
import MovieView from "./movie-view";
import LoginView from "./login-view";
import RegistrationView from "./registration-view";
import UserProfile from "./profile-view";
import DirectorView from "./director-view";
import GenreView from "./genre-view";
import 'bootstrap/dist/css/bootstrap.css';
require('dotenv').config();
class MainView extends React.Component {
    constructor(props) {
        super(props);
      
        this.SERVER_ROOT_URL = "https://ryanm-movies.herokuapp.com/";
        
        this.state = {
            SERVER_ROOT_URL: "https://ryanm-movies.herokuapp.com/",
            movies:[],
            movie:undefined,
            director:undefined,
            genre: undefined,
            isLoaded:false,
            error:null,
            token:sessionStorage.getItem("token")
        }

    }
	  

    //if ((this.SERVER_BASE_URL+"").length <4 || SERVER_BASE_URL.charAt(0)!=='h')
    
    
    //SERVER_BASE_URL="http://localhost:8080/";
 componentDidMount(){
  this.loadData();
 }
    loadData(){
      alert(this.state.SERVER_ROOT_URL);
        fetch(this.state.SERVER_ROOT_URL+"movies")
      .then(res => res.json())
      .then(
        (result) => {
          console.log ("get movies", result);
          this.setState({
            isLoaded: true,
            movies: result
          });
         // console.log (result[0]);
        
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            alert("error!!");
            console.log ("error!!", error);
          this.setState({
            isLoaded: true,
            error:error
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
  setToken = (token)=>{
    this.setState({token:token});
   
    if (token !=null)
        document.getElementById("moviesLink").click();
  }
  logoutUser = ()=>{
    localStorage.removeItem("token");
    this.setState({token:null});
  }
    render() {
        if (!this.state.isLoaded) {
            return <div />
        }
        return (
          <Router>
            <div>version: 3.6</div>
            <div className="left20px container">	
              {this.state.token?
              <span>
                <Link to={"/logout"}> Logout</Link> | 
               |<Link to={"/movies"} id='moviesLink'> Movies</Link> 
               |<Link to={"/profile"}> Profile</Link>
                </span>
              :
              <span>
              <Link to={"/login"}> Login</Link> | 
              <Link to={"/register"}> Register</Link> 
              </span>
              }
              <hr/>
            </div>
                <Switch>
            <Route exact path="/">
              
            </Route>
            
            <Route path="/login">
            
              <LoginView server={this.state.SERVER_ROOT_URL} setToken={this.setToken}/>
              
            </Route>
            <Route path="/logout">
           
            <LoginView server={this.state.SERVER_ROOT_URL} setToken={this.setToken}/>
            
            </Route>
            <Route exact path="/movies">
            
            
            <MovieCard 
              movies={this.state.movies}
              setMovieView={this.showMovie}
              server={this.state.SERVER_ROOT_URL}
            />
            </Route>
            
        
            <Route path="/movies/:movieId" 
              render={({match})=> (
                <MovieView movie={this.state.movies.find((m)=>`${m.id}`===match.params.movieId)} server={this.state.SERVER_ROOT_URL}/>
              )}


            />
             <Route path="/director/:dirName" 
              render={({match})=> (
                <DirectorView dirName={match.params.dirName} server={this.state.SERVER_ROOT_URL}/>
              )}


            />
            <Route path="/genre/:genre" 
              render={({match})=> (
                <GenreView genre={match.params.genre} server={this.state.SERVER_ROOT_URL}/>
              )}


            />
            <Route path="/profile">
              <UserProfile server={this.SERVER_ROOT_URL}/>
            </Route>
         
            <Route path="/register">
              <RegistrationView server={this.SERVER_ROOT_URL}/>
            </Route>
          </Switch>
        </Router>);
    }

}
export default MainView;