import { combineReducers, createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
// import { version } from 'mongoose';
import {persistStore , persistReducer} from 'redux-persist';
import { ProductListReducer, ProductReducer } from './Reducers/Product.js';



const persistConfig = {
    key : 'root',
    storage,
    version : 1
}


const rootReducer = combineReducers({
    //your reducers here
    ProductListReducer,
    ProductReducer
})

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig , rootReducer)

export const store = createStore(persistedReducer , applyMiddleware(thunk));

export let persistor = persistStore(store);