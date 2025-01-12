import axios from "../axios";

import {
  ALL_CONTENTS_REQUEST,
  ALL_CONTENTS_SUCCESS,
  ALL_CONTENTS_FAIL,
  ADMIN_CONTENTS_REQUEST,
  ADMIN_CONTENTS_SUCCESS,
  ADMIN_CONTENTS_FAIL,
  NEW_CONTENT_REQUEST,
  NEW_CONTENT_SUCCESS,
  NEW_CONTENT_FAIL,
  DELETE_CONTENT_REQUEST,
  DELETE_CONTENT_SUCCESS,
  DELETE_CONTENT_FAIL,
  UPDATE_CONTENT_REQUEST,
  UPDATE_CONTENT_SUCCESS,
  UPDATE_CONTENT_FAIL,
  CONTENT_DETAILS_REQUEST,
  CONTENT_DETAILS_SUCCESS,
  CONTENT_DETAILS_FAIL,
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
  ALL_CONTENTS_REQUESTPTSN,
  ADMIN_CONTENTS_REQUESTPTSN,
  ALL_CONTENTS_SUCCESSPTSN,
  ADMIN_CONTENTS_SUCCESSPTSN,
  ALL_CONTENTS_FAILPTSN,
  ADMIN_CONTENTS_FAILPTSN,
  CLEAR_ERRORSPTSN,
  CONTENT_DETAILS_REQUESTPTSN,
  CONTENT_DETAILS_SUCCESSPTSN,
  CONTENT_DETAILS_FAILPTSN,
} from "../constants/contentConstants";

export const getContents =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_CONTENTS_REQUEST });

      let link = `/api/v1/contents?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/contents?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_CONTENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CONTENTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const newContent = (contentData) => async (dispatch) => {
  try {
    let cookies = document.cookie;
    let arrCookies = cookies.split(";");
    let accessToken = "";

    for (let index = 0; index < arrCookies.length; index++) {
      const element = arrCookies[index];
      if (element.split("=")[0].includes("accessToken")) {
        accessToken = element.split("=")[1];
        break;
      }
    }

    dispatch({ type: NEW_CONTENT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Beare ${accessToken}`,
      },
      // withCredentials: true
    };

    const { data } = await axios.post(
      `/api/create-new-content`,
      contentData,
      config
    );
    if (data && data.message === "Ok") {
      dispatch({
        type: NEW_CONTENT_SUCCESS,
        payload: data.content,
      });
    } else {
      dispatch({
        type: NEW_CONTENT_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: NEW_CONTENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete content (Admin)
export const deleteContent = (id) => async (dispatch) => {
  try {
    let cookies = document.cookie;
    let arrCookies = cookies.split(";");
    let accessToken = "";

    for (let index = 0; index < arrCookies.length; index++) {
      const element = arrCookies[index];
      if (element.split("=")[0].includes("accessToken")) {
        accessToken = element.split("=")[1];
        break;
      }
    }

    dispatch({ type: DELETE_CONTENT_REQUEST });

    const config = {
      headers: {
        token: `Beare ${accessToken}`,
      },
      // withCredentials: true
    };

    const { data } = await axios.delete(`/api/delete-content?id=${id}`, config);
    if (data && data.errCode && data.errCode === 0) {
      dispatch({
        type: DELETE_CONTENT_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: DELETE_CONTENT_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_CONTENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Content (ADMIN)
export const updateContent = (contentData) => async (dispatch) => {
  try {
    let cookies = document.cookie;
    let arrCookies = cookies.split(";");
    let accessToken = "";

    for (let index = 0; index < arrCookies.length; index++) {
      const element = arrCookies[index];
      if (element.split("=")[0].includes("accessToken")) {
        accessToken = element.split("=")[1];
        break;
      }
    }

    dispatch({ type: UPDATE_CONTENT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Beare ${accessToken}`,
      },
      // withCredentials: true
    };

    const { data } = await axios.put(`/api/edit-content`, contentData, config);
    
    if (data && data.content) {
      dispatch({
        type: UPDATE_CONTENT_SUCCESS,
        payload: data.content,
      });
    } 
  } catch (error) {
    dispatch({
      type: UPDATE_CONTENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getContentDetails = (id) => async (dispatch) => {
  try {
    let cookies = document.cookie;
    let arrCookies = cookies.split(";");
    let accessToken = "";

    for (let index = 0; index < arrCookies.length; index++) {
      const element = arrCookies[index];
      if (element.split("=")[0].includes("accessToken")) {
        accessToken = element.split("=")[1];
        break;
      }
    }


    dispatch({ type: CONTENT_DETAILS_REQUEST });

    const config = {
      headers: {
        token: `Beare ${accessToken}`,
      },
      // withCredentials: true
    };

    const { data } = await axios.get(`/api/get-all-contents?id=${id}`, config);

    if (data && data.contents && data.contents.tenBaiViet) {
      dispatch({
        type: CONTENT_DETAILS_SUCCESS,
        payload: data.contents,
      });
    }
  } catch (error) {

    dispatch({
      type: CONTENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getContentDetailsPTSN = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_DETAILS_REQUESTPTSN });

    const { data } = await axios.get(`/api/get-all-contents-ptsn?id=${id}`);

    if (data && data.contents) {
      dispatch({
        type: CONTENT_DETAILS_SUCCESSPTSN,
        payload: data.contents,
      });
    }
  } catch (error) {

    dispatch({
      type: CONTENT_DETAILS_FAILPTSN,
      payload: error.response.data.message,
    });
  }
};

export const getAdminContents = () => async (dispatch) => {
  try {
    let cookies = document.cookie;
    let arrCookies = cookies.split(";");
    let accessToken = "";

    for (let index = 0; index < arrCookies.length; index++) {
      const element = arrCookies[index];
      if (element.split("=")[0].includes("accessToken")) {
        accessToken = element.split("=")[1];
        break;
      }
    }

    dispatch({ type: ADMIN_CONTENTS_REQUEST });

    const config = {
      headers: {
        token: `Beare ${accessToken}`,
      },
      // withCredentials: true
    };

    const { data } = await axios.get(`/api/get-all-contents?id=All`, config);
    if (data && data.contents && data.contents.length > 0) {
      dispatch({
        type: ADMIN_CONTENTS_SUCCESS,
        payload: data.contents,
      });
    } else {
      dispatch({
        type: ADMIN_CONTENTS_FAIL,
        payload: data.contents.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_CONTENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminContentsPTSN = (typeRole) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CONTENTS_REQUESTPTSN });

    const { data } = await axios.get(
      `/api/get-all-contents-ptsn?typeRole=${typeRole}`
    );
    if (data && data.contents && data.contents.length > 0) {
      dispatch({
        type: ADMIN_CONTENTS_SUCCESSPTSN,
        payload: data.contents,
      });
    } else {
      dispatch({
        type: ADMIN_CONTENTS_FAILPTSN,
        payload: data.contents.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_CONTENTS_FAILPTSN,
      payload: error.response.data.message,
    });
  }
};

// Create new review
export const newReview = (reviewData) => async (dispatch) => {
  try {

    let cookies = document.cookie;
    let arrCookies = cookies.split(";");
    let accessToken = "";

    for (let index = 0; index < arrCookies.length; index++) {
      const element = arrCookies[index];
      if (element.split("=")[0].includes("accessToken")) {
        accessToken = element.split("=")[1];
        break;
      }
    }

    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: `Beare ${accessToken}`,
      },
      // withCredentials: true
    };

    const { data } = await axios.post(`/api/create-new-review`, reviewData, config);
    if(data && data.message === "Ok"){
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

// Get content reviews
export const getContentReviews = (idContent) => async (dispatch) => {
  try {  
    dispatch({ type: GET_REVIEWS_REQUEST });    
    const { data } = await axios.get(`/api/get-content-review?idContent=${idContent}`);

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

// Delete content review
export const deleteReview = (dataparam) => async (dispatch) => {
  try {

    let cookies = document.cookie;
    let arrCookies = cookies.split(";");
    let accessToken = "";

    for (let index = 0; index < arrCookies.length; index++) {
      const element = arrCookies[index];
      if (element.split("=")[0].includes("accessToken")) {
        accessToken = element.split("=")[1];
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
    
    let idContent = dataparam.idContent; 
    let email = dataparam.email; 
    let like = dataparam.like;

    const { data } = await axios.delete(
      `/api/delete-review?idContent=${idContent}&email=${email}&like=${like}`, config
    );

    if(data && data.errCode === 0){
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

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
