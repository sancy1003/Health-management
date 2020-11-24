import React from 'react';
import "../assets/css/sidebar.css";

const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className="sidebar-logo">Health Navi</div>
            <ul className="sidebar-list">
                <li><i className="fas fa-th-large"></i>대시보드</li>
                <li><i className="fas fa-user"></i>고객 관리</li>
                <li className="active"><i className="fas fa-lock"></i>라커룸 관리</li>
                <li><i className="fas fa-chart-line"></i>통계</li>
                <li><i className="fas fa-cog"></i>환경설정</li>
            </ul>
        </div>
    );
};

export default Sidebar;