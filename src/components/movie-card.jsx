import React from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col, Button} from 'react-bootstrap';
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
    showGenre = (id)=>{
        
		this.props.setGenreView(id);
    }
    showDirector =(id)=>{
        this.props.setDirectorView(id);
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
                     <Button className='btn-light btn-sm'
                 onClick={()=>this.showDirector(idx)}>{movie.director.name}
                 </Button>
                 </Col>  
                 <Col  className='btn-light'>
                 <Button className='btn-light btn-sm'
                 onClick={()=>this.showGenre(idx)}>{movie.genre.category}
                 </Button>
                 </Col>
                </Row>
            ))}
            </Container>
            
        </div>);
    }

}
export default MovieCard;