import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//const server = 'https://ryanm-movies.herokuapp.com/';
const server = 'http://localhost:5000/';
export const getMovieList = createAsyncThunk(
	'movies/getMovieList',
	async () => {
		const resp = await fetch(server+'movies');
		if (resp.ok) {
			const movies = await resp.json();
			console.log("fetch",movies);
			return { movies };
		}
	}
);
export const getMovieById = createAsyncThunk(
	'movies/getMovieById',
	async (payload) => {
	
		const resp = await fetch(server+'movie/id/'+payload.id);
		if (resp.ok) {
			const movie = await resp.json();
			console.log(movie);
			console.log("fetch",movie);
			return { movie };
		}
	}
);
export const register = createAsyncThunk(
	'auth/users',
	async (payload) => {
		const reg =  JSON.stringify(payload.reg);
		
		const resp = await fetch(server+'users/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: reg,
		});

		if (resp.ok) {
			const msg = await resp.json();
			console.log(msg);
			if (msg.hasOwnProperty("message"))
				alert("resistration Ok!");
			else
				alert("Login failed!");
			return { msg };
		}
	}
);

export const login = createAsyncThunk(
	'user/auth',
	async (payload) => {
		console.log("payload", payload);
		const user = JSON.stringify(payload.auth);
	//	alert("login: "+user)
		const resp = await fetch(server+'users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: user,
		});

		if (resp.ok) {
			const msg = await resp.json();
			console.log(msg);
			if (msg.hasOwnProperty("token"))
				alert("Login Ok!");
			else
				alert("Login failed!");
			return { msg };
		}
	}
);
export const deleteRegistration = createAsyncThunk(
	'todos/deleteRegistration',
	async (payload) => {
		const resp = await fetch(`${server}todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

export const appSlice = createSlice({
	name: 'movies',
	initialState: [],
	reducers: {
		newUser: (state, action) => {
			const todo = {
				id: new Date().getTime(),
				task: action.payload.task
				
			};
			state.push(todo);
		},
		loginState: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			
		},
	},
	extraReducers: {
		
		[getMovieList.fulfilled]: (state, action) => {
		
			return action.payload.movies;
			
		},
		[getMovieById.fulfilled]: (state, action) => {
			
				return action.payload.movie;
				
			},
		[register.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		
		[deleteRegistration.fulfilled]: (state, action) => {
			
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { newUser, loginState } = appSlice.actions;

export default appSlice.reducer;