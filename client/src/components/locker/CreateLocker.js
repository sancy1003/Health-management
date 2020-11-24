import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOCKER_CREATE_REQUEST} from "../../redux/types";

const CreateLocker = () => {
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState("");
    const [form, setValue] = useState({
        createNumber: 0,
    });
    const dispatch = useDispatch();
    const { loading, errorMsg, successMsg } = useSelector((state) => state.locker);
    const { branchOffice } = useSelector((state) => state.auth);

    useEffect(() => {
        try{
            setLocalMsg(errorMsg);
        } catch(e) {
            console.log(e);
        }
    }, [errorMsg]);

    useEffect(() => {
        try{
            closeModal();
        } catch(e) {
            console.log(e);
        }
    }, [successMsg]);

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        });
        setModal(!modal);
    }

    const onChange = (e) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { createNumber } = form;
        const locker = { createNumber, branchOffice };
        console.log(locker);
        dispatch({
            type: LOCKER_CREATE_REQUEST,
            payload: locker,
        })
        setValue({
            createNumber: 0,
        })
    }

    const closeModal = () => {
        setModal(false);
    }

    const createLockerModal = (
        <form className="locker-modal" onSubmit={onSubmit}>
            {!loading ? <i onClick={handleToggle} className="fas fa-times"></i> : "" }
            <div className="locker-modal-title">Health Navi</div>
            <div className="locker-input-box">
                <input type="number" name="createNumber" id="createNumber" placeholder="생성할 숫자를 입력해주세요." onChange={onChange}></input>
            </div>
            {localMsg ? <div className="locker-modal-msg">{localMsg}</div> : <div className="locker-modal-msg"></div>}
            {loading ? <div className="locker-loading-msg">잠시 기다려주세요.</div> : <button>라커 생성</button>}
        </form>
    );

    return(
        <Fragment>
            <button onClick={handleToggle} className="btn-create-locker">락커 생성</button>
            { modal ? createLockerModal : ""}
        </Fragment>
    );
}

export default CreateLocker;