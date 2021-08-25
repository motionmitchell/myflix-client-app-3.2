import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import MainView from "./components/main-view/main-view";


// Import statement to indicate that we need to bundle `./index.scss`

import './App.css';
const store = createStore(moviesApp); // CREATE THE STORE
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<MainView />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
