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