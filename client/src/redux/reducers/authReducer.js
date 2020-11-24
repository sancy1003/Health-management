import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
} from "../types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: "",
    userId: "",
    userName: "",
    userRole: "",
    branchOffice: "",
    errorMsg: "",
    successMsg: "",
    previousMatchMsg: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGOUT_REQUEST:
        case LOGIN_REQUEST:
            return {
            ...state,
            errorMsg: "",
            isLoading: true,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false,
            userId: action.payload.user.id,
            userRole: action.payload.user.role,
            userName: action.payload.user.name,
            branchOffice: action.payload.user.branch_office,
            errorMsg: "",
            };
        case REGISTER_FAILURE:
        case LOGOUT_FAILURE:
        case LOGIN_FAILURE:
            localStorage.removeItem("token");
            return {
            ...state,
            ...action.payload,
            token: null,
            user: null,
            userId: null,
            userRole: null,
            branchOffice: null,
            isAuthenticated: false,
            isLoading: false,
            errorMsg: action.payload.data.msg,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
            token: null,
            user: null,
            userId: null,
            branchOffice: null,
            isAuthenticated: false,
            isLoading: false,
            userRole: null,
            errorMsg: "",
            };
        case USER_LOADING_REQUEST:
            return {
            ...state,
            isLoading: true,
            };
        case USER_LOADING_SUCCESS:
            return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload,
            userId: action.payload._id,
            userName: action.payload.name,
            userRole: action.payload.role,
            branchOffice: action.payload.branch_office,
        };
        case USER_LOADING_FAILURE:
            return {
            ...state,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            userRole: "",
            };
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
};

export default authReducer;