import axios from 'axios'

import {
    PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQ, PRODUCT_DETAIL_SUCCESS
} from '../Constants/Product.js'

import { BASE_URL } from '../Constants/BASE_URL.JS'

export const productListAction = ()=> async (dispatch) =>{
    try {
        dispatch({type : PRODUCT_LIST_REQ})
        const {data} = await axios.get(`${BASE_URL}/api/products`)
        dispatch({type : PRODUCT_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type : PRODUCT_LIST_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
        
    }
}

export const productAction = (id)=> async (dispatch) =>{
    try {
        dispatch({type : PRODUCT_DETAIL_REQ})
        const {data} = await axios.get(`${BASE_URL}/api/products/${id}`)
        dispatch({type : PRODUCT_DETAIL_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type : PRODUCT_DETAIL_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
        
    }
}