import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import lockerReducer from './lockerReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    locker: lockerReducer,
})

export default createRootReducer;