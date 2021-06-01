import axios from "../helpers/axios";
import { categoryConstansts } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`category/getcategory`);
        console.log(res);
        if (res.status === 200) {

            const { categoryList } = res.data;

            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}

export const getCategoryByCity = (city) => {
    return async dispatch => {

        dispatch({ type: categoryConstansts.GET_CATEGORIES_BY_CITY_REQUEST });
        const res = await axios.get(`category/getcategory/${city}`);
        console.log(res);
        if (res.status === 200) {

            const { categoryList } = res.data;

            dispatch({
                type: categoryConstansts.GET_CATEGORIES_BY_CITY_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstansts.GET_CATEGORIES_BY_CITY_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}
