import axios from '../axios';

import {
	ALL_BOOKINGS_REQUEST,
	ALL_BOOKINGS_SUCCESS,
	ALL_BOOKINGS_FAIL,
	ADMIN_BOOKINGS_REQUEST,
	ADMIN_BOOKINGS_SUCCESS,
	ADMIN_BOOKINGS_FAIL,
	NEW_BOOKING_REQUEST,
	NEW_BOOKING_SUCCESS,
	NEW_BOOKING_FAIL,
	DELETE_BOOKING_REQUEST,
	DELETE_BOOKING_SUCCESS,
	DELETE_BOOKING_FAIL,
	UPDATE_BOOKING_REQUEST,
	UPDATE_BOOKING_SUCCESS,
	UPDATE_BOOKING_FAIL,
	BOOKING_DETAILS_REQUEST,
	BOOKING_DETAILS_SUCCESS,
	BOOKING_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
	GET_REVIEWS_REQUEST,
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAIL,
	CLEAR_ERRORS,
	ALL_BOOKINGS_REQUESTPTSN,
	ADMIN_BOOKINGS_REQUESTPTSN,
	ALL_BOOKINGS_SUCCESSPTSN,
	ADMIN_BOOKINGS_SUCCESSPTSN,
	ALL_BOOKINGS_FAILPTSN,
	ADMIN_BOOKINGS_FAILPTSN,
	CLEAR_ERRORSPTSN,
	BOOKING_DETAILS_REQUESTPTSN,
	BOOKING_DETAILS_SUCCESSPTSN,
	BOOKING_DETAILS_FAILPTSN,
	SEARCH_BOOKINGS_PTSN,

	NEW_DISCUSSIONCONTENT_REQUEST,
	NEW_DISCUSSIONCONTENT_SUCCESS,
	NEW_DISCUSSIONCONTENT_FAIL,

	ADMIN_DISCUSSIONCONTENTS_REQUEST,
	ADMIN_DISCUSSIONCONTENTS_SUCCESS,
	ADMIN_DISCUSSIONCONTENTS_FAIL,

	DELETE_DISCUSSIONCONTENT_REQUEST,
	DELETE_DISCUSSIONCONTENT_SUCCESS,
	DELETE_DISCUSSIONCONTENT_FAIL,
	UPDATE_DISCUSSIONCONTENT_REQUEST,
	UPDATE_DISCUSSIONCONTENT_SUCCESS,
	UPDATE_DISCUSSIONCONTENT_FAIL,

	NEW_DISCUSSIONTIME_REQUEST,
	NEW_DISCUSSIONTIME_SUCCESS,
	NEW_DISCUSSIONTIME_FAIL,

	ADMIN_DISCUSSIONTIMES_REQUEST,
	ADMIN_DISCUSSIONTIMES_SUCCESS,
	ADMIN_DISCUSSIONTIMES_FAIL,

	DELETE_DISCUSSIONTIME_REQUEST,
	DELETE_DISCUSSIONTIME_SUCCESS,
	DELETE_DISCUSSIONTIME_FAIL,
	UPDATE_DISCUSSIONTIME_REQUEST,
	UPDATE_DISCUSSIONTIME_SUCCESS,
	UPDATE_DISCUSSIONTIME_FAIL,
} from '../constants/bookingConstants';

export const getBookings =
	(keyword = '', currentPage = 1, price, category, rating = 0) =>
	async (dispatch) => {
		try {
			dispatch({ type: ALL_BOOKINGS_REQUEST });

			let link = `/api/v1/bookings?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

			if (category) {
				link = `/api/v1/bookings?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
			}

			const { data } = await axios.get(link);

			dispatch({
				type: ALL_BOOKINGS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ALL_BOOKINGS_FAIL,
				payload: error.response.data.message,
			});
		}
	};

export const newBooking = (bookingData) => async (dispatch) => {
	try {
		
		dispatch({ type: NEW_BOOKING_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json'
			},
			// withCredentials: true
		};

		const { data } = await axios.post(`/api/create-new-booking`, bookingData, config);
		if (data && data.message === 'Ok') {
			dispatch({
				type: NEW_BOOKING_SUCCESS,
				payload: data.booking,
			});
		} else {
			dispatch({
				type: NEW_BOOKING_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: NEW_BOOKING_FAIL,
			payload: error.response.data.message,
		});
	}
};


export const getBookingDetails = (id) => async (dispatch) => {
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

		dispatch({ type: BOOKING_DETAILS_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.get(`/api/get-all-bookings?id=${id}`, config);

		if (data && data.schedules) {
			dispatch({
				type: BOOKING_DETAILS_SUCCESS,
				payload: data.schedules,
			});
		}
	} catch (error) {
		dispatch({
			type: BOOKING_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};


// Update Booking (ADMIN)
export const updateBooking = (bookingData) => async (dispatch) => {
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

		dispatch({ type: UPDATE_BOOKING_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.put(`/api/edit-booking`, bookingData, config);

		if (data) {
			dispatch({
				type: UPDATE_BOOKING_SUCCESS,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: UPDATE_BOOKING_FAIL,
			payload: error.response.data.message,
		});
	}
};


// Delete booking (Admin)
export const deleteBooking = (id) => async (dispatch) => {
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

		dispatch({ type: DELETE_BOOKING_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.delete(`/api/delete-booking?id=${id}`, config);
		if (data) {
			dispatch({
				type: DELETE_BOOKING_SUCCESS,
				payload: true,
			});
		} else {
			dispatch({
				type: DELETE_BOOKING_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: DELETE_BOOKING_FAIL,
			payload: error.response.data.message,
		});
	}
};




export const getBookingDetailsPTSN = (id) => async (dispatch) => {
	try {
		dispatch({ type: BOOKING_DETAILS_REQUESTPTSN });

		const { data } = await axios.get(`/api/get-all-bookings-ptsn?id=${id}`);

		if (data && data.bookings) {
			dispatch({
				type: BOOKING_DETAILS_SUCCESSPTSN,
				payload: data.bookings,
			});
		}
	} catch (error) {
		dispatch({
			type: BOOKING_DETAILS_FAILPTSN,
			payload: error.response.data.message,
		});
	}
};

export const getAdminBookings = () => async (dispatch) => {
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

		dispatch({ type: ADMIN_BOOKINGS_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.get(`/api/get-all-bookings?id=All`, config);
		if (data && data.bookings && data.bookings.length > 0) {
			dispatch({
				type: ADMIN_BOOKINGS_SUCCESS,
				payload: data.bookings,
			});
		} else {
			dispatch({
				type: ADMIN_BOOKINGS_FAIL,
				payload: data.bookings.message,
			});
		}
	} catch (error) {
		dispatch({
			type: ADMIN_BOOKINGS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getAdminBookingsPTSN = (typeRole) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_BOOKINGS_REQUESTPTSN });

		const { data } = await axios.get(`/api/get-all-bookings-ptsn?typeRole=${typeRole}`);
		if (data && data.bookings && data.bookings.length > 0) {
			dispatch({
				type: ADMIN_BOOKINGS_SUCCESSPTSN,
				payload: data.bookings,
			});
		} else {
			dispatch({
				type: ADMIN_BOOKINGS_FAILPTSN,
				payload: data.bookings.message,
			});
		}
	} catch (error) {
		dispatch({
			type: ADMIN_BOOKINGS_FAILPTSN,
			payload: error?.response?.data?.message,
		});
	}
};

// Create new review
export const newReview = (reviewData) => async (dispatch) => {
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

		dispatch({ type: NEW_REVIEW_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.post(`/api/create-new-review`, reviewData, config);
		if (data && data.message === 'Ok') {
			dispatch({
				type: NEW_REVIEW_SUCCESS,
				payload: data.success,
			});
		}
	} catch (error) {
		dispatch({
			type: NEW_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get booking reviews
export const getBookingReviews = (idBooking) => async (dispatch) => {
	try {
		dispatch({ type: GET_REVIEWS_REQUEST });
		const { data } = await axios.get(`/api/get-booking-review?idBooking=${idBooking}`);

		dispatch({
			type: GET_REVIEWS_SUCCESS,
			payload: data.reviews,
		});
	} catch (error) {
		dispatch({
			type: GET_REVIEWS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Delete booking review
export const deleteReview = (dataparam) => async (dispatch) => {
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

		dispatch({ type: DELETE_REVIEW_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		let idBooking = dataparam.idBooking;
		let email = dataparam.email;
		let like = dataparam.like;

		const { data } = await axios.delete(
			`/api/delete-review?idBooking=${idBooking}&email=${email}&like=${like}`,
			config,
		);

		if (data && data.errCode === 0) {
			dispatch({
				type: DELETE_REVIEW_SUCCESS,
				payload: true,
			});
		}
	} catch (error) {
		console.log(error.response);

		dispatch({
			type: DELETE_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};


export const setSearchBookingsPTSN = (data) => async (dispatch) => {
	try {	
			dispatch({
				type: SEARCH_BOOKINGS_PTSN,
				payload: data,
			});
		
	} catch (error) {
		console.log(error);
		
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};


export const newDiscussionContent = (discussioncontentData) => async (dispatch) => {
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
		dispatch({ type: NEW_DISCUSSIONCONTENT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.post(`/api/create-new-discussioncontent`, discussioncontentData, config);
		if (data && data.message === 'Ok') {
			dispatch({
				type: NEW_DISCUSSIONCONTENT_SUCCESS,
				payload: data.discussioncontent,
			});
		} else {
			dispatch({
				type: NEW_DISCUSSIONCONTENT_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: NEW_DISCUSSIONCONTENT_FAIL,
			payload: error.response.data.message,
		});
	}
};


// DiscussionContent
export const getAdminDiscussionContents = () => async (dispatch) => {
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

		dispatch({ type: ADMIN_DISCUSSIONCONTENTS_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.get(`/api/get-all-discussioncontents?id=All`, config);
		
		if (data && data.discussioncontents && data.discussioncontents.length > 0) {
			dispatch({
				type: ADMIN_DISCUSSIONCONTENTS_SUCCESS,
				payload: data.discussioncontents,
			});
		} else {
			dispatch({
				type: ADMIN_DISCUSSIONCONTENTS_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: ADMIN_DISCUSSIONCONTENTS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateDiscussionContent = (discussioncontentData) => async (dispatch) => {
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

		dispatch({ type: UPDATE_DISCUSSIONCONTENT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.put(`/api/edit-discussioncontent`, discussioncontentData, config);

		if (data && data.message) {
			dispatch({
				type: UPDATE_DISCUSSIONCONTENT_SUCCESS,
				payload: true,
			});
		}
	} catch (error) {
		dispatch({
			type: UPDATE_DISCUSSIONCONTENT_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteDiscussionContent = (id) => async (dispatch) => {
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

		dispatch({ type: DELETE_DISCUSSIONCONTENT_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.delete(`/api/delete-discussioncontent?id=${id}`, config);
		if (data) {
			dispatch({
				type: DELETE_DISCUSSIONCONTENT_SUCCESS,
				payload: true,
			});
		} else {
			dispatch({
				type: DELETE_DISCUSSIONCONTENT_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: DELETE_DISCUSSIONCONTENT_FAIL,
			payload: error.response.data.message,
		});
	}
};




export const newDiscussionTime = (discussiontimeData) => async (dispatch) => {
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
		dispatch({ type: NEW_DISCUSSIONTIME_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.post(`/api/create-new-discussiontime`, discussiontimeData, config);
		if (data && data.message === 'Ok') {
			dispatch({
				type: NEW_DISCUSSIONTIME_SUCCESS,
				payload: data.discussiontime,
			});
		} else {
			dispatch({
				type: NEW_DISCUSSIONTIME_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: NEW_DISCUSSIONTIME_FAIL,
			payload: error.response.data.message,
		});
	}
};


// DiscussionTime
export const getAdminDiscussionTimes = () => async (dispatch) => {
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

		dispatch({ type: ADMIN_DISCUSSIONTIMES_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.get(`/api/get-all-discussiontimes?id=All`, config);
		if (data && data.discussiontimes && data.discussiontimes.length > 0) {
			dispatch({
				type: ADMIN_DISCUSSIONTIMES_SUCCESS,
				payload: data.discussiontimes,
			});
		} else {
			dispatch({
				type: ADMIN_DISCUSSIONTIMES_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: ADMIN_DISCUSSIONTIMES_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateDiscussionTime = (discussiontimeData) => async (dispatch) => {
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

		dispatch({ type: UPDATE_DISCUSSIONTIME_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.put(`/api/edit-discussiontime`, discussiontimeData, config);

		if (data && data.message) {
			dispatch({
				type: UPDATE_DISCUSSIONTIME_SUCCESS,
				payload: true,
			});
		}
	} catch (error) {
		dispatch({
			type: UPDATE_DISCUSSIONTIME_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteDiscussionTime = (id) => async (dispatch) => {
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

		dispatch({ type: DELETE_DISCUSSIONTIME_REQUEST });

		const config = {
			headers: {
				token: `Beare ${accessToken}`,
			},
			// withCredentials: true
		};

		const { data } = await axios.delete(`/api/delete-discussiontime?id=${id}`, config);
		if (data) {
			dispatch({
				type: DELETE_DISCUSSIONTIME_SUCCESS,
				payload: true,
			});
		} else {
			dispatch({
				type: DELETE_DISCUSSIONTIME_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: DELETE_DISCUSSIONTIME_FAIL,
			payload: error.response.data.message,
		});
	}
};



