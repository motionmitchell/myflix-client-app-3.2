import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import MovieCard from "./components/MovieCard";
import MovieView from "./components/MovieView";
function App() {
	  useEffect(() => {
    getMovies();
  }, []);
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState({});
	
  const getMovies = () => {
    //alert("load");
    //const t = localStorage.getItem("todos");
	document.getElementById ("divMovieView").style.display = "none"
	// fetch ("")
	const movies =[
                {id:1, title:"Star Wars, New hope", description:"Star Wars, New hope", genre:"Sci Fi", director:"George Lucas", imageUrl:""},
                {id:2, title:"Star Wars, empire strikes back", description:"Star Wars, empire strikes back", genre:"Sci Fi", director:"George Lucas", imageUrl:""},
                {id:3, title:"Star Wars, return of the jedi", description:"Star Wars, return of the jedi", genre:"Sci Fi", director:"George Lucas", imageUrl:""}
            ];
	setMovies(movies);
  };
  const setMovieView=(idx)=>{
	  //alert(idx);
	  setMovie(movies[idx -1]);
	   document.getElementById ("divMainView").style.display = "none";
	  document.getElementById ("divMovieView").style.display = "block";
  }
  const backClick=()=>{
	  document.getElementById ("divMovieView").style.display = "none";
	   document.getElementById ("divMainView").style.display = "block";
  }
  return (
    <div className="App">
      <header className="App-header">
        <h3>Ryan's Movie App</h3>
	
      </header>
         
    </div>
  );
}

export default App;
