import {
    LOCKER_NONE,
    LOCKER_LOADING_FAILURE,
    LOCKER_LOADING_SUCCESS,
    LOCKER_LOADING_REQUEST,
} from "../types"

const initialState = {
    lockers: [],
    number: "",
    loading: false,
    error: "",
    client: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOCKER_NONE:
            return {
                ...state,
                lockers: [],
            }
        case LOCKER_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOCKER_LOADING_SUCCESS:
            return {
                ...state,
                lockers: [...state.lockers, ...action.payload],
                loading: false,
            }
        case LOCKER_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}