import {
    LOCKER_NONE,
    LOCKER_LOADING_FAILURE,
    LOCKER_LOADING_SUCCESS,
    LOCKER_LOADING_REQUEST,
    LOCKER_CREATE_REQUEST,
    LOCKER_CREATE_FAILURE,
    LOCKER_CREATE_SUCCESS,
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    LOCKER_DELETE_REQUEST,
    LOCKER_DELETE_SUCCESS,
    LOCKER_DELETE_FAILURE,
    LOCKER_EDIT_FAILURE,
    LOCKER_EDIT_REQUEST,
    LOCKER_EDIT_SUCCESS,
} from "../types"

const initialState = {
    lockers: [],
    number: "",
    loading: false,
    errorMsg: "",
    successMsg: "",
    client: "",
    previousMatchMsg: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOCKER_NONE:
            return {
                ...state,
                lockers: [],
            }
        case LOCKER_LOADING_REQUEST:
        case LOCKER_CREATE_REQUEST:
        case LOCKER_DELETE_REQUEST:
        case LOCKER_EDIT_REQUEST:
            return {
                ...state,
                errorMsg: "",
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
        case LOCKER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: "",
                successMsg: action.payload.msg,
            }
        case LOCKER_CREATE_FAILURE:
            return {
                ...state,
                errorMsg: action.payload.data.msg,
                loading: false,
            }        
        case LOCKER_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMsg: "",
                successMsg: action.payload.msg,
            }        
        case LOCKER_EDIT_FAILURE:
            return {
                ...state,
                errorMsg: action.payload.data.msg,
                loading: false,
            }
        case LOCKER_DELETE_SUCCESS:
            return {
                ...state,
                errorMsg: "",
                successMsg: action.payload.msg,
                loading: false,
            }
        case LOCKER_DELETE_FAILURE:
            return {
                ...state,
                errorMsg: action.payload.data.msg,
                loading: false,
            }
        case CLEAR_ERROR_REQUEST:
            return {
            ...state,
            };
        case CLEAR_ERROR_SUCCESS:
            return {
            ...state,
            errorMsg: "",
            previousMatchMsg: "",
            };
        case CLEAR_ERROR_FAILURE:
            return {
            ...state,
            errorMsg: "Clear Error Fail",
            previousMatchMsg: "Clear Error Fail",
            };
        default:
            return state;
    }
}