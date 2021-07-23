import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
class DirectorView extends React.Component {
    constructor(props) {
        super(props);
	
        this.state={
            director:this.props.director
        }
    }
    render() {
        return (<div className="container">
            
            <p>Name: {this.props.director.name}</p>
            <p>Birth Year: {this.props.director.birthYear}</p>
            <p>Death Year: {this.props.director.deathYear}</p>
            <p>Bio: {this.props.director.bio}</p>
        </div>);
    }
}
export default DirectorView;