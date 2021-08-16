import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const server = 'https://ryanm-movies.herokuapp.com/';
//const server = 'http://localhost:5000/';
export const getMovieList = createAsyncThunk(
	'movies/getMovieList',
	async () => {
		const resp = await fetch(server + 'movies');
		if (resp.ok) {
			const movies = await resp.json();
			//alert("fetch");
			console.log("fetch", movies);
			return { movies };
		}
	}
);
export const getProfile = createAsyncThunk(
	'movies/getProfile',
	async () => {
		//alert("getProfile");
		const resp = await fetch(server + 'user');
		console.log("getProfile", resp);
		if (resp.ok) {
			const user = await resp.json();
			//alert("fetch");
			console.log("getProfile.user", user);
			return { user };
		}
	}
);
export const deleteRegistration = createAsyncThunk(
	'movies/deleteReg',
	async () => {
		//alert("deleteRegistration");
		const resp = await fetch(server + 'user/unreg');
		if (resp.ok) {
			const msg = await resp.json();
			//alert("fetch");
			console.log("msg", msg);
			return { msg };
		}
	}
);
export const getMovieById = createAsyncThunk(
	'movies/getMovieById',
	async (payload) => {

		const resp = await fetch(server + 'movie/id/' + payload.id);
		if (resp.ok) {
			const movie = await resp.json();
			console.log(movie);
			console.log("fetch", movie);
			return { movie };
		}
	}
);
export const removeFavorite = createAsyncThunk(
	'movies/removeFavorite',
	async (payload) => {

		const resp = await fetch(server + 'user/movie/remove/' + payload.id);
		if (resp.ok) {
			const msg = await resp.json();
			console.log(msg);
			console.log("removeFavorite: ", msg);
			return { msg };
		}
	}
);
export const getMoviesByDirector = createAsyncThunk(
	'movies/getMoviesByDirector',
	async (payload) => {

		const resp = await fetch(server + 'movies/director/' + payload.name);
		if (resp.ok) {
			const movies = await resp.json();
			console.log(movies);
			console.log("fetch", movies);
			return { movies };
		}
	}
);
export const getMoviesByGenre = createAsyncThunk(
	'movies/getMoviesByGenre',
	async (payload) => {
		console.log("genre", payload.genre)
		const resp = await fetch(server + 'movies/genre/' + payload.genre);
		if (resp.ok) {
			const movies = await resp.json();
			console.log(movies);
			console.log("fetch", movies);
			return { movies };
		}
	}
);
export const register = createAsyncThunk(
	'auth/users',
	async (payload) => {
		const reg = JSON.stringify(payload.reg);

		const resp = await fetch(server + 'users/register', {
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
				console.log("resistration Ok!");
			else
				console.log("Login failed!");
			return { msg };
		}
	}
);
export const saveProfile = createAsyncThunk(
	'auth/saveProfile',
	async (payload) => {
		const profile = JSON.stringify(payload.profile);
		console.log("save profile", profile);
		const resp = await fetch(server + 'users/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: profile,
		});

		if (resp.ok) {
			const response = await resp.json();
			console.log(response);
			if (response.hasOwnProperty("message"))
				console.log("profile saved!");
			else
				console.log("profile NOT saved!");
			return { response };
		}
	}
);
export const login = createAsyncThunk(
	'user/auth',
	async (payload) => {
		//alert("server!: " + server)
		console.log("payload", payload);
		const user = JSON.stringify(payload.auth);
		//alert("login: " + user)
		const resp = await fetch(server + 'users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: user,
		});

		if (resp.ok) {
			const msg = await resp.json();
			console.log("RES", msg);
			if (msg.hasOwnProperty("token"))
				console.log("Login Ok!");
			else
				console.log("Login failed!!");
			return { msg };
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
		[getMoviesByDirector.fulfilled]: (state, action) => {

			return action.payload.movies;

		},
		[getMoviesByGenre.fulfilled]: (state, action) => {

			return action.payload.movies;

		},
		[getProfile.fulfilled]: (state, action) => {

			return action.payload.user;

		},
		[register.fulfilled]: (state, action) => {
			//	state.push(action.payload.msg);
			return action.payload.response;
		},
		[saveProfile.fulfilled]: (state, action) => {
			//	state.push(action.payload.msg);
			return action.payload.response;
		},
		[login.fulfilled]: (state, action) => {
			//state.push(action.payload.msg);
			return action.payload.msg;
		},
		[deleteRegistration.fulfilled]: (state, action) => {

			return action.payload.msg;
		},
		[removeFavorite.fulfilled]: (state, action) => {

			return action.payload.msg;
		},
	},
});

export const { newUser, loginState } = appSlice.actions;

export default appSlice.reducer;