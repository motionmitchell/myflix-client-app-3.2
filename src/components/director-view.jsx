import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

class DirectorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      director: {},
      movies: [],
      isLoaded: false
    }
  }
  componentDidMount() {
    const dirName = this.props.dirName;

    fetch(this.props.server + "movies/director/" + dirName)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);

          this.setState({
            movies: result,
            director: result[0].director,
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
          <Row>
            <Col>
              Name: {this.state.director.name}
            </Col>
          </Row>
          <Row>
            <Col>
              Birth Year: {this.state.director.birthYear}
            </Col>
          </Row>

          <Row>
            <Col>
              Death Year: {this.state.director.deathYear}
            </Col>
          </Row>

          <Row>
            <Col>
              Bio: {this.state.director.bio}
            </Col>
          </Row>


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
export default DirectorView;