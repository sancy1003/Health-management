import axios from 'axios';
import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    LOCKER_LOADING_FAILURE,
    LOCKER_LOADING_SUCCESS,
    LOCKER_LOADING_REQUEST,
    LOCKER_CREATE_REQUEST,
    LOCKER_CREATE_SUCCESS,
    LOCKER_CREATE_FAILURE,
    LOCKER_DELETE_FAILURE,
    LOCKER_DELETE_SUCCESS,
    LOCKER_DELETE_REQUEST,
    LOCKER_EDIT_REQUEST,
    LOCKER_EDIT_FAILURE,
    LOCKER_EDIT_SUCCESS,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_SUCCESS,
} from "../types"

const loadLockerAPI = (payload) => {
    console.log(payload, "payload");
    return axios.get(`/api/locker/${payload}`);
}

function* loadLocker(action) {
    try {
        const result = yield call(loadLockerAPI, action.payload);
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

// CreateLocker
const createLockerAPI = (req) => {
  console.log(req, "req");
  return axios.post("api/locker", req);
};

function* createLocker(action) {
  try {
    const result = yield call(createLockerAPI, action.payload);
    yield put({
      type: LOCKER_CREATE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOCKER_CREATE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchCreateLocker() {
  yield takeEvery(LOCKER_CREATE_REQUEST, createLocker);
}

// DeleteLocker
const deleteLockerAPI = (payload) => {
    console.log(payload, "payload");
    return axios.delete(`api/locker/${payload.branchOffice}/${payload.deleteNumber}`);
  };
  
function* deleteLocker(action) {
    try {
        const result = yield call(deleteLockerAPI, action.payload);
        yield put({
            type: LOCKER_DELETE_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: LOCKER_DELETE_FAILURE,
            payload: e.response,
        });
    }
  }
  
  function* watchDeleteLocker() {
    yield takeEvery(LOCKER_DELETE_REQUEST, deleteLocker);
  }

  // EditLocker
  const editLockerAPI = (payload) => {
      console.log(payload, "payload");
      return axios.post(`api/locker/${payload.id}/edit`, payload);
    };
    
  function* editLocker(action) {
      try {
          const result = yield call(editLockerAPI, action.payload);
          yield put({
              type: LOCKER_EDIT_SUCCESS,
              payload: result.data,
          });
      } catch (e) {
          yield put({
              type: LOCKER_EDIT_FAILURE,
              payload: e.response,
          });
      }
    }
    
    function* watchEditLocker() {
      yield takeEvery(LOCKER_EDIT_REQUEST, editLocker);
    }

// Clear Error
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
  }
}

function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

export default function* LockerSaga() {
    yield all([
        fork(watchLoadLocker),
        fork(watchCreateLocker),
        fork(watchClearError),
        fork(watchDeleteLocker),
        fork(watchEditLocker),
    ]);
}