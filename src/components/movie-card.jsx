import React from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
class MovieCard extends React.Component {
    constructor(props) {
        super(props);
		//console.log (props);
        this.state = {
            
        }
    }
    componentDidMount(){
      //alert(this.props.server);
        fetch(this.props.server+"user")
        .then(res => res.json())
        .then(
          (result) => {
            console.log ("card-user", result);
            if (result["_id"]==undefined) // no user logged in redirect to login page.
            {

                window.location.href="/login";
            }
          }
          ,
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
              alert("error fetch movies");
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
    showMovie = (id)=>{
        
		this.props.setMovieView(id);
    }

    render() {
        return (
            <div>
            <Container>
            {this.props.movies.map ((movie, idx)=>(
                <Row className="show-grid">
                <Col className='btn-light'><Link to={`/movies/${movie.id}`}>{movie.description}</Link>
                </Col>               
                 <Col  className='btn-light'>
                     {movie.director.name}
             
                 </Col>  
                 <Col  className='btn-light'>
                 {movie.genre.category}
                 </Col>
                </Row>
            ))}
            </Container>
            
        </div>);
    }

}
export default MovieCard;