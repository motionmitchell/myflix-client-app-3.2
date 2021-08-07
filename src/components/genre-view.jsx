import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col} from 'react-bootstrap';
class GenreView extends React.Component {
    constructor(props) {
        super(props);
	
        this.state={
            genre:{},
            movies:[],
            isLoaded:false
        }
    }
    componentDidMount(){
        const genre = this.props.genre;
        
        fetch("http://localhost:5000/movies/genre/"+genre)
        .then(res => res.json())
        .then(
          (result) => {
            console.log (result);

            this.setState({
              movies:result,
              genre:result[0].genre,
              isLoaded:true
            });

            //alert(result.fullname);
           console.log (result);
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
  
        // fetch current user;
      }
    render() {
        if (!this.state.isLoaded){
            return (<div>loading...</div>)
        }
        return (
        
        
            <div className="container">
            
            <p>Gengre: {this.state.genre.category}</p>
            

            <Container>
            {this.state.movies.map ((movie, idx)=>(
                <Row className="show-grid">
                <Col className='btn-light'>{movie.description}
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
export default GenreView;