import React, { Fragment, useCallback, useEffect  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Login from '../components/auth/Login';
import Register from './auth/Register';

import "../assets/css/header.css"

const Header = () => {
    const { isAuthenticated, user, userRole } = useSelector(
      // auth 리듀서에서 유저 정보, 인증 여부를 받아옴
      (state) => state.auth
    );
    console.log(userRole, "UserRole");
  
    const dispatch = useDispatch();
  
    const onLogout = useCallback(() => {
      dispatch({
        type: LOGOUT_REQUEST,
      });
    }, [dispatch]);

    const guestLink = (
        <Fragment>
            <Login />
            <Register />
        </Fragment>
    );
    const authLink = (
        <Fragment>
            <span>{ user ? user.name : "" }</span>님 환영합니다.
            <button onClick={onLogout} className="btn-logout">로그아웃</button>
        </Fragment>
    );

    return(
        <div className="header">
            <div className="header-title">라커룸 관리</div>
            <div className="header-right-box">
                { isAuthenticated ? authLink : guestLink }
            </div>
        </div>
    );
}

export default Header;