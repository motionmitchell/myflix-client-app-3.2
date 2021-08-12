import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    console.log("MovieCard", props);
    this.state = {
      movies: props.movies,
      message: "loading...",
      isLoaded: false
    }
  }
  componentDidMount() {
    console.log("movies");

    fetch(this.props.server + "user")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("card-user", result);
          if (result["_id"] === undefined) // no user logged in redirect to login page.
          {
            window.location.href = "/login";
          }
          this.setState({
            movies: this.props.movies,
            isLoaded: true
          })
        }
        ,
        (error) => {

          this.setState({
            isLoaded: false,
            error: error,
            message: "error loading movies"
          });
        }
      );
  }
  showMovie = (id) => {
    this.props.setMovieView(id);
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>{this.state.message}</div>
    }
    return (
      <div>
        <Container>
          {this.state.movies.map((movie, idx) => (
            <Row className="show-grid">
              <Col className='btn-light'><Link to={`/movies/${movie.id}`}>{movie.description}</Link>
              </Col>
              <Col className='btn-light'>
                {movie.director.name}
              </Col>
              <Col className='btn-light'>
                {movie.genre.category}
              </Col>
            </Row>
          ))}
        </Container>

      </div>);
  }

}
export default MovieCard;