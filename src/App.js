import React, { useEffect } from "react";
import './App.css';

import MainView from "./components/main-view";

function App() {
  useEffect(() => {
    //getMovies();
  }, []);

  return (

    <div className="App">
      <header className="App-header">
        <h3>Ryan's Movie App</h3>

        <MainView />


      </header>

    </div>

  );
}

export default App;
