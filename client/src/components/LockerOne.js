import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOCKER_EDIT_REQUEST} from "../redux/types";

const LockerOne = ({lockers}) => {
    const [modal, setModal] = useState(false);
    const [lockerNumber, setLockerNumber] = useState(0);
    const [localMsg, setLocalMsg] = useState("");
    const [form, setValue] = useState({
        client: "",
        id: "",
    });
    const dispatch = useDispatch();
    const { loading, errorMsg, successMsg } = useSelector((state) => state.locker);

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


    const handleToggle = (key, number) => {
        if(!modal) {
            dispatch({
                type: CLEAR_ERROR_REQUEST,
            });
            setValue({id : key});
            setLockerNumber(number);
            console.log(key, "키값");
            setModal(!modal);
            }
        }

    const onChange = (e) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { id, client } = form;
        const locker = { client, id };
        console.log(locker);
        dispatch({
            type: LOCKER_EDIT_REQUEST,
            payload: locker,
        })
        setValue({
            client: "",
        })
        console.log(form.id)
    }

    const closeModal = () => {
        setModal(false);
    }

    const lockerModal = (
        <form onSubmit={onSubmit} className="locker-modal">
            <i onClick={closeModal} className="fas fa-times"></i>
            <div className="locker-modal-title">{lockerNumber}번 라커</div>
            <div className="locker-input-box">
                <input type="text" name="client" id="client" onChange={onChange} placeholder="사용자 이름을 입력하세요."></input>
            </div>
            {localMsg ? <div className="locker-modal-msg">{localMsg}</div> : <div className="locker-modal-msg"></div>}
            {loading ? <div className="locker-loading-msg">잠시 기다려주세요.</div> : <button>사용자 변경</button>}
        </form>
    );


    return(
        <Fragment>
            {
                Array.isArray(lockers) ? lockers.map(({_id, number, client}) => {
                    return(
                        <Fragment key={_id}>
                            { client ? 
                                <li onClick={() => {handleToggle(_id, number)}} className="locker-list-item">
                                    <div className="locker-number">{number}</div>
                                    <div>{client}</div>
                                </li>
                            :
                                <li onClick={() => {handleToggle(_id, number)}} className="locker-list-item none">
                                    <div className="locker-number">{number}</div>
                                    <div>사용자</div>
                                </li>
                            }
                        </Fragment>
                    )
                }) : ""
            }
            { modal ? lockerModal : ""}
        </Fragment>
    )
}

export default LockerOne;