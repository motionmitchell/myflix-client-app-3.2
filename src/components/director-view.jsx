import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
class DirectorView extends React.Component {
    constructor(props) {
        super(props);
	
        this.state={
            director:{},
            movies:[],
            isLoaded:false
        }
    }
    componentDidMount(){
        const dirName = this.props.dirName;
        
        fetch(this.props.server+"movies/director/"+dirName)
        .then(res => res.json())
        .then(
          (result) => {
            console.log (result);

            this.setState({
              movies:result,
              director:result[0].director,
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
            
            <p>Name: {this.state.director.name}</p>
            <p>Birth Year: {this.state.director.birthYear}</p>
            <p>Death Year: {this.state.director.deathYear}</p>
            <p>Bio: {this.state.director.bio}</p>

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
export default DirectorView;