import React, { Fragment, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import LockerSaga from '../../redux/sagas/lockerSaga';
import {LOCKER_LOADING_REQUEST, LOCKER_NONE} from "../../redux/types";
import LockerOne from '../../components/LockerOne';

import "../../assets/css/locker.css"

const LockerList = () => {
    const { lockers } = useSelector((state) => state.locker);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: LOCKER_NONE});
        dispatch({type: LOCKER_LOADING_REQUEST});
    },[dispatch]);

    console.log(lockers, "lockers");

    return(
        <Fragment>
            <Helmet title="Locker" />
            <div className="locker-container">
                <div className="locker-btn-box">
                    <button className="btn-create-locker">락커 생성</button>
                    <button className="btn-delete-locker">락커 삭제</button>
                </div>
                <ul className="locker-list">
                    { lockers.length !== 0 ? <LockerOne lockers={lockers} /> : "없음"}
                </ul>
            </div>
        </Fragment>
    );
}

export default LockerList;