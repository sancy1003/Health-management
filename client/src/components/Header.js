import React from 'react';
import "../assets/css/header.css"

const Header = () => {
    return(
        <div className="header">
            <div className="header-title">대시보드</div>
            <div className="header-btn-box">
                <button className="btn-login">로그인</button>
                <button className="btn-signup">계정 생성</button>
            </div>
        </div>
    );
}

export default Header;