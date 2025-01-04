import { PRODUCT_LIST_REQ } from "../Constants/Product.js";

import { PRODUCT_LIST_SUCCESS } from "../Constants/Product.js";

import { PRODUCT_LIST_FAIL } from "../Constants/Product.js";

import { PRODUCT_DETAIL_REQ } from "../Constants/Product.js";

import { PRODUCT_DETAIL_SUCCESS } from "../Constants/Product.js";

import { PRODUCT_DETAIL_FAIL } from "../Constants/Product.js";



export const ProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQ:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload , totalPage: action.payload.totalPage , page: action.payload.page };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload.error };
        default:
            return state;
    }
}

export const ProductReducer = (state = { product: {reviews:[]} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQ:
            return { loading: true, ...state };
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload  };
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}