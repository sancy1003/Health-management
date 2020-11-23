import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";

const Login = () => {
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState("");
    const [form, setValue] = useState({
        account: "",
        password: "",
    });
    const dispatch = useDispatch();
    const { errorMsg } = useSelector((state) => state.auth);

    useEffect(() => {
        try{
            setLocalMsg(errorMsg);
        } catch(e) {
            console.log(e);
        }
    }, [errorMsg]);

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
        const { account, password } = form;
        const user = { account, password };
        console.log(user);
        dispatch({
            type: LOGIN_REQUEST,
            payload: user,
        })
    }

    const closeModal = () => {
        setModal(false);
    }

    const loginModal = (
        <form className="login-modal" onSubmit={onSubmit}>
            <i onClick={closeModal} className="fas fa-times"></i>
            <div className="login-modal-title">Health Navi</div>
            <div className="login-input-box">
                <input type="text" name="account" id="account" placeholder="id" onChange={onChange}></input>
                <input type="password" name="password" id="password" placeholder="password" onChange={onChange}></input>
            </div>
            {localMsg ? <div className="login-modal-msg">{localMsg}</div> : <div className="login-modal-msg"></div>}
            <button>로그인</button>
        </form>
    );

    return(
        <div>
            <button onClick={handleToggle} className="btn-login">로그인</button>
            { modal ? loginModal : ""}
        </div>
    );
}

export default Login;