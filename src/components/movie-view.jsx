import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
class MovieView extends React.Component {
  
    render() {
        return (
        <div className="container">
            <div class="row rowImage">
            <div class="col-md-2 col-md-offset-5">
            <img src={this.props.movie.imageURL}/>
            </div>
            </div>
            <div class="row rowEven">
            <div class="col col-lg-2">Title: </div>
            <div class="col">   {this.props.movie.description}</div>
            </div>
            <div class="row rowOdd">
            <div class="col col-lg-2">Description:</div>
            <div class="col"> {this.props.movie.description}</div>
            </div>
            <div class="row rowEven">
            <div class="col col-lg-2">Genre: </div>
            <div class="col">{this.props.movie.genre.category}</div>
            </div>
            <div class="row rowOdd">
            <div class="col col-lg-2">Director:</div>
            <div class="col">{this.props.movie.director.name}</div>
             </div>
        </div>);
    }
}
export default MovieView;