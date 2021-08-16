import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import MovieCard from "./movie-card";
import MovieView from "./movie-view";
import LoginView from "./login-view";
import RegistrationView from "./registration-view";
import UserProfile from "./profile-view";
import DirectorView from "./director-view";
import GenreView from "./genre-view";

import { connect } from 'react-redux';
import { getMovieList } from '../reducer';
require('dotenv').config();
class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SERVER_ROOT_URL: "https://ryanm-movies.herokuapp.com/",  // PROD
      //SERVER_ROOT_URL: "http://localhost:5000/", // DEV
      movies: [],
      movie: undefined,
      director: undefined,
      genre: undefined,
      isLoaded: true,
      error: null,
      token: sessionStorage.getItem("token")
    }

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
    this.setState({ token: token });

    if (token != null)
      document.getElementById("moviesLink").click();
  }
  logoutUser = () => {
    sessionStorage.removeItem("token");
    this.setState({ token: null });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div />
    }
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

            <LoginView setToken={this.setToken} />

          </Route>
          <Route path="/logout">

            <LoginView setToken={this.setToken} />

          </Route>
          <Route exact path="/movies"
            render={() => ( // 3.27

              this.state.token ? (<MovieCard />) : (
                <LoginView setToken={this.setToken} />
              )
            )}
          />

          <Route path="/movies/:movieId"
            render={({ match }) => (
              <MovieView movieId={match.params.movieId} />
            )}
          />
          <Route path="/director/:dirName"
            render={({ match }) => (
              <DirectorView dirName={match.params.dirName} />
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
function mapStateToProps(state) {
  console.log("mapStateToProps.movies:", state.movies);
  return {
    movies: state.movies
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const getMovies = dispatch(getMovieList());

  return {
    getMovieList: getMovies
  }

  // console.log("mapDispatchToProps",getMovies);

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)