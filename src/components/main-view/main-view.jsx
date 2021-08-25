import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import MovieList from "../movie-list/movie-list";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import RegistrationView from "../registration-view/registration-view";
import UserProfile from "../profile-view/profile-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
require('dotenv').config();
class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SERVER_ROOT_URL: "https://ryanm-movies.herokuapp.com/",  // PROD
      //SERVER_ROOT_URL: "http://localhost:5000/", // DEV
      movies: [],
      user: null,
      movie: undefined,
      director: undefined,
      genre: undefined,
      isLoaded: false,
      error: null,
      token: sessionStorage.getItem("token")
    }

  }
  componentDidMount() {
    // same code

    this.getUser();
    this.getMovies(this.state.token);

  }
  getMovies(token) {
    axios.get(this.state.SERVER_ROOT_URL + 'movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log("getMovies", response);

        this.props.setMovies(response.data);
        this.setState({ isLoaded: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getUser() {
    axios.get(this.state.SERVER_ROOT_URL + 'user', {

    })
      .then(response => {
        //  alert("getUser");
        console.log("getUser1", response.data);
        // #4
        this.setState({ user: response.data });
        // this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showMovie = (idx) => {
    console.log(this.state.movies[idx]);
    this.setState({ movie: this.state.movies[idx] })
  }
  showGenre = (idx) => {
    console.log(this.state.movies[idx]);
    this.setState({ genre: this.state.movies[idx].genre })
  }
  showDirector = (idx) => {
    console.log(this.state.movies[idx]);
    this.setState({ director: this.state.movies[idx].director })
  }
  setToken = (token) => {
    //  alert(token);
    this.setState({ token: token });
    sessionStorage.setItem("token", token);
    if (token != null)
      document.getElementById("moviesLink").click();
  }
  logoutUser = () => {
    sessionStorage.removeItem("token");
    this.setState({ token: null });
  }
  getMovie = (idx) => {
    alert("getMovie: " + idx)
    console.log("prop movies", this.props.movies);
    const m = this.props.movies[parseInt(idx)];
    console.log("getMovie", m);
    return m;
  }
  render() {

    if (!this.state.isLoaded) {
      return <div>loading...</div>
    }
    let { movies } = this.props;
    let { user } = this.state;
    console.log("let movies: ", movies);
    return (
      <Router>
        <div>version: 3.8</div>
        <div className="left20px container">
          {this.state.token ?
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
          <hr />
        </div>
        <Switch>
          <Route exact path="/">

          </Route>

          <Route path="/login">

            <LoginView setToken={this.setToken} server={this.state.SERVER_ROOT_URL} />

          </Route>
          <Route path="/logout">

            <LoginView setToken={this.setToken} server={this.state.SERVER_ROOT_URL} />

          </Route>
          <Route exact path="/movies"
            render={() => ( // 3.27

              this.state.token ? (<MovieList movies={movies} server={this.state.SERVER_ROOT_URL} />) : (
                <LoginView setToken={this.setToken} server={this.state.SERVER_ROOT_URL} />
              )
            )}
          />

          <Route path="/movies/:movieId"
            render={({ match }) => (
              <MovieView movies={movies} movieId={match.params.movieId} server={this.state.SERVER_ROOT_URL} />
            )}
          />
          <Route path="/director/:dirName"
            render={({ match }) => (
              <DirectorView dirName={match.params.dirName} server={this.state.SERVER_ROOT_URL} />
            )}


          />
          <Route path="/genre/:genre"
            render={({ match }) => (
              <GenreView genre={match.params.genre} server={this.state.SERVER_ROOT_URL} />
            )}
          />
          <Route path="/profile">
            <UserProfile server={this.state.SERVER_ROOT_URL} />
          </Route>

          <Route path="/register">
            <RegistrationView server={this.state.SERVER_ROOT_URL} />
          </Route>

        </Switch>
      </Router>);
  }

}


let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);