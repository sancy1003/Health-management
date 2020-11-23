import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import lockerReducer from './lockerReducer';
import authReducer from './authReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    locker: lockerReducer,
})

export default createRootReducer;