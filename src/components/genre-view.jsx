import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
class GenreView extends React.Component {
    constructor(props) {
        super(props);
	
        this.state={
            genre:this.props.genre
        }
    }
    render() {
        return (<div className="container">
            
            <p>Categeory: {this.props.genre.category}</p>

        </div>);
    }
}
export default GenreView;