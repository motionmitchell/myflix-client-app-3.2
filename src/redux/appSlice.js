import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const server = 'https://ryanm-movies.herokuapp.com/';
var GV_MOVIES=null;
export const getMovieList = createAsyncThunk(
	'movies/getMovieList',
	async () => {
		const resp = await fetch(server+'movies');
		if (resp.ok) {
			GV_MOVIES = await resp.json();
			return { GV_MOVIES };
		}
	}
);
export const getMovieById = createAsyncThunk(
	'movies/getMovieById',
	async () => {
		GV_MOVIES.forEach(element => {
			if (element.id == payload.id)
			{
				return element;
			}
		});
	}
);
export const register = createAsyncThunk(
	'/users/register',
	async (payload) => {
		const resp = await fetch(server+'users/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( payload.body ),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);
export const login = createAsyncThunk(
	'/users/login',
	async (payload) => {
		const resp = await fetch(server+'/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( payload.body ),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);


export const appSlice = createSlice({
	name: 'app',
	initialState: [],
	reducers: {
		register1: (state, action) => {
			const user = {
				email: action.payload.email, 
				password: action.payload.password ,
				fullname: action.payload.fullname,
				birthdate: action.payload.birthdate
			};
			state.push(user);
		},
		login1: (state, action) => {
			const user = {
				email: action.payload.email, 
				password: action.payload.password 
				
			};
			state.push(user);
		},
	},
	
});

export const { register1, login1 } = appSlice.actions;

export default appSlice.reducer;