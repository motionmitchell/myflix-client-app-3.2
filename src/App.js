import React from "react";


import './App.css';


import MainView from "./components/main-view";



  const App = () => {
    return (
      <div className='container bg-white p-4 mt-5'>
        <h1>Movie List:</h1>
        <MainView />
        
      </div>
    );
  };

export default App;
