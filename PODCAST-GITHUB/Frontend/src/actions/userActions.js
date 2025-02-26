import axios from '../axios';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	NEW_PASSWORD_REQUEST,
	NEW_PASSWORD_SUCCESS,
	NEW_PASSWORD_FAIL,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	CLEAR_ERRORS,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
} from '../constants/userConstants';

// Login
export const login = (email, password) => async (dispatch) => {
	try {
		let setCookie = (cname, cvalue, minutes) => {
			let d = new Date();
			d.setTime(d.getTime() + minutes * 60 * 1000);
			let expires = 'expires=' + d.toUTCString();
			document.cookie = cname + '=' + cvalue + '; ' + expires;
		};

		dispatch({ type: LOGIN_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
			// withCredentials: true
		};

		const { data } = await axios.post('/api/login', { email, password }, config);

		if (data && data.user && data.user.email) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: data.user,
			});

			let accessToken = data.user.accessToken;
			let refToken = data.user.refreshToken;
			setCookie('accessToken', accessToken, 4320);
			setCookie('refreshToken', refToken, 4320);
		} else {
			dispatch({
				type: LOGIN_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.message,
		});
	}
};

// Register user
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			}
			// withCredentials: true
		};

		const { data } = await axios.post('/api/create-new-account', userData, config);

		if (data && data.message === 'Ok') {
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: data.message,
			});
		} else {
			dispatch({
				type: REGISTER_USER_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Load user
export const loadUser = () => async (dispatch) => {
	try {
		let cookies = document.cookie;
		let arrCookies = cookies.split(';');
		let accessToken = '';

		for (let index = 0; index < arrCookies.length; index++) {
			const element = arrCookies[index];
			if (element.split('=')[0].includes('accessToken')) {
				accessToken = element.split('=')[1];
				break;
			}
		}

		dispatch({ type: LOAD_USER_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.get('/api/get-account', config);

		if (data && data.user && data.user.email) {
			dispatch({
				type: LOAD_USER_SUCCESS,
				payload: data.user,
			});
		}
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL,
			payload: error?.response?.data,
		});
	}
};

export const deleteUser = (id) => async (dispatch) => {
	try {
		let cookies = document.cookie;
		let arrCookies = cookies.split(';');
		let accessToken = '';

		for (let index = 0; index < arrCookies.length; index++) {
			const element = arrCookies[index];
			if (element.split('=')[0].includes('accessToken')) {
				accessToken = element.split('=')[1];
				break;
			}
		}

		dispatch({ type: DELETE_USER_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.delete(`/api/delete-user?id=${id}`, config);

		dispatch({
			type: DELETE_USER_SUCCESS,
			payload: true,
		});
	} catch (error) {
		dispatch({
			type: DELETE_USER_FAIL,
			payload: error.response.data,
		});
	}
};

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
	try {
		let cookies = document.cookie;
		let arrCookies = cookies.split(';');
		let accessToken = '';

		for (let index = 0; index < arrCookies.length; index++) {
			const element = arrCookies[index];
			if (element.split('=')[0].includes('accessToken')) {
				accessToken = element.split('=')[1];
				break;
			}
		}

		dispatch({ type: UPDATE_PROFILE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.put('/api/edit-account', userData, config);

		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: true,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
	try {
		let cookies = document.cookie;
		let arrCookies = cookies.split(';');
		let accessToken = '';

		for (let index = 0; index < arrCookies.length; index++) {
			const element = arrCookies[index];
			if (element.split('=')[0].includes('accessToken')) {
				accessToken = element.split('=')[1];
				break;
			}
		}

		dispatch({ type: UPDATE_PASSWORD_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				token: `Beare ${accessToken}`,
			},
		};

		const { data } = await axios.put('/api/update-password', passwords, config);

		if (data && data.errCode === 0) {
			dispatch({
				type: UPDATE_PASSWORD_SUCCESS,
				payload: data.message,
			});
		} else {
			dispatch({
				type: UPDATE_PASSWORD_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: error.response,
		});
	}
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		};

		const { data } = await axios.post('/api/v1/password/forgot', email, config);

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
	try {
		dispatch({ type: NEW_PASSWORD_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		};

		const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);

		dispatch({
			type: NEW_PASSWORD_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: NEW_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Logout user
export const logout = () => async (dispatch) => {
	try {
		let setCookie = (cname, cvalue, minutes, path) => {
			let d = new Date();
			d.setTime(d.getTime() + minutes * 60 * 1000);
			let expires = 'expires=' + d.toUTCString();
			let pathc = 'path=' + path;
			document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + pathc;
		};

		let cookies = document.cookie;
		let arrCookies = cookies.split(';');

		for (let index = 0; index < arrCookies.length; index++) {
			setCookie('accessToken', '', 0, '/');
			setCookie('accessToken', '', 0, '/admin');
			setCookie('refreshToken', '', 0, '/');
			setCookie('refreshToken', '', 0, '/admin');
		}

		await axios.post('/api/logout');

		dispatch({
			type: LOGOUT_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get all users
export const allUsers = () => async (dispatch) => {
	try {
		let cookies = document.cookie;
		let arrCookies = cookies.split(';');
		let accessToken = '';

		for (let index = 0; index < arrCookies.length; index++) {
			const element = arrCookies[index];
			if (element.split('=')[0].includes('accessToken')) {
				accessToken = element.split('=')[1];
				break;
			}
		}

		dispatch({ type: ALL_USERS_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.get('/api/get-all-users', config);

		dispatch({
			type: ALL_USERS_SUCCESS,
			payload: data.users,
		});
	} catch (error) {
		dispatch({
			type: ALL_USERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update user - ADMIN
export const updateUser = (userData) => async (dispatch) => {
	try {
		let cookies = document.cookie;
		let arrCookies = cookies.split(';');
		let accessToken = '';

		for (let index = 0; index < arrCookies.length; index++) {
			const element = arrCookies[index];
			if (element.split('=')[0].includes('accessToken')) {
				accessToken = element.split('=')[1];
				break;
			}
		}

		dispatch({ type: UPDATE_USER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.put(`/api/edit-user`, userData, config);

		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: true,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
	try {
		let cookies = document.cookie;
		let arrCookies = cookies.split(';');
		let accessToken = '';

		for (let index = 0; index < arrCookies.length; index++) {
			const element = arrCookies[index];
			if (element.split('=')[0].includes('accessToken')) {
				accessToken = element.split('=')[1];
				break;
			}
		}

		dispatch({ type: USER_DETAILS_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.get(`/api/get-user?id=${id}`, config);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
