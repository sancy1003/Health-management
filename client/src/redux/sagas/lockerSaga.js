import axios from 'axios';
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    LOCKER_LOADING_FAILURE,
    LOCKER_LOADING_SUCCESS,
    LOCKER_LOADING_REQUEST,
} from "../types"

const loadLockerAPI = () => {
    return axios.get(`/api/locker`);
}

function* loadLocker(action) {
    try {
        const result = yield call(loadLockerAPI);
        console.log(result, "loadPosts");
        yield put({
            type: LOCKER_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch(e) {
        yield put({
            type: LOCKER_LOADING_FAILURE,
            payload: e,
        });
        yield put(push("/"));
    }
}

function* watchLoadLocker() {
    yield takeEvery(LOCKER_LOADING_REQUEST, loadLocker);
}

export default function* LockerSaga() {
    yield all([
        fork(watchLoadLocker),
    ]);
}