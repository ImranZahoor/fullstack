import axios from "../helpers/axios";
import { pageConstants } from "./constants";

export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
        try {
            const res = await axios.post('/page/create', form);
            if (res.status === 201) {
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                });
            } else {
                dispatch({
                    type: pageConstants.CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllPages = async () => {
    console.log("getAllpages")
    return async (dispatch) => {
        dispatch({ type: pageConstants.GET_ALL_PAGES_REQUEST });
        try {
            const res = await axios.get('/page/all');
            if (res.status === 200) {
                dispatch({
                    type: pageConstants.GET_ALL_PAGES_SUCCESS,
                    payload: { page: res.data.page }
                });
            } else {
                dispatch({
                    type: pageConstants.GET_ALL_PAGES_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
}