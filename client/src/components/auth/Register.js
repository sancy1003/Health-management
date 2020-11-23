import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";

const Register = () => {
    const [modal, setModal] = useState(false);
    const [form, setValue] = useState({
        name: "",
        account: "",
        password: "",
        branch_office: "",
    });
    const [localMsg, setLocalMsg] = useState("");
    const { errorMsg } = useSelector((state) => state.auth); //reducers의 index.js에 auth를 의미

    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        });
        setModal(!modal);
    };

    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg]);
    // errorMsg가 변할 경우에 실행 함

    const onChange = (e) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, account, password, branch_office } = form;
        const newUser = { name, account, password, branch_office };
        console.log(newUser, "newUser");
        dispatch({
        type: REGISTER_REQUEST,
        payload: newUser,
        });
    };

    const closeModal = () => {
        setModal(false);
    }

    const registerModal = (
        <form className="register-modal" onSubmit={onSubmit}>
            <i onClick={closeModal} className="fas fa-times"></i>
            <div className="register-modal-title">Health Navi</div>
            <div className="register-input-box">
                <input type="text" name="account" id="account" placeholder="id" onChange={onChange}></input>
                <input type="password" name="password" id="password" placeholder="password" onChange={onChange}></input>
                <input type="text" name="name" id="name" placeholder="이름" onChange={onChange}></input>
                <input type="text" name="branch_office" id="branch_office" placeholder="지점" onChange={onChange}></input>
            </div>
            {localMsg ? <div className="register-modal-msg">{localMsg}</div> : <div className="register-modal-msg"></div>}
            <button>계정 생성</button>
        </form>
    );

    return(
        <div>
            <button onClick={handleToggle} className="btn-signup">계정 생성</button>
            { modal ? registerModal : "" }
        </div>
    )
}

export default Register;