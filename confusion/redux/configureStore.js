import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes, comments, promotions, leaders } from './stores';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders
        }),
        applyMiddleware(thunk)
    );

    return store;
}