import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
class GenreView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: {},
      movies: [],
      isLoaded: false
    }
  }
  componentDidMount() {
    const genre = this.props.genre;

    fetch(this.props.server + "movies/genre/" + genre)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);

          this.setState({
            movies: result,
            genre: result[0].genre,
            isLoaded: true
          });


          console.log(result);

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

    // fetch current user;
  }
  render() {
    if (!this.state.isLoaded) {
      return (<div>loading...</div>)
    }
    return (


      <div>
        <Container>
          <Row><Col>Gengre: {this.state.genre.category}</Col></Row>



          {this.state.movies.map((movie, idx) => (
            <Row className="show-grid">
              <Col className='btn-light'>{movie.description}
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
export default GenreView;