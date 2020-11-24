import React, { Fragment, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import LockerSaga from '../../redux/sagas/lockerSaga';
import {LOCKER_LOADING_REQUEST, LOCKER_NONE} from "../../redux/types";
import LockerOne from '../../components/LockerOne';
import CreateLocker from '../../components/locker/CreateLocker';
import DeleteLocker from '../../components/locker/DeleteLocker';

import "../../assets/css/locker.css"

const LockerList = () => {
    const { lockers, successMsg } = useSelector((state) => state.locker);
    const { branchOffice } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({type: LOCKER_NONE});
        dispatch({
            type: LOCKER_LOADING_REQUEST,
            payload: branchOffice,
        });
    },[dispatch, branchOffice, successMsg]);

    const lockerContainer = (
        <div className="locker-container">
            <div className="locker-btn-box">
                <CreateLocker />
                <DeleteLocker />
            </div>
            <ul className="locker-list">
                { lockers.length !== 0 ? <LockerOne lockers={lockers} /> : ""}
            </ul>
        </div>
        );
    return(
        <Fragment>
            <Helmet title="Locker" />
            { branchOffice ? lockerContainer : "" }
        </Fragment>
    );
}

export default LockerList;