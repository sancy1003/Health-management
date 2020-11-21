import React, { Fragment } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MyRouter = () => {
    return (
        <div className="health-navi">
            <Sidebar/>
            <div className="main">
                <Header/>
                <div className="container">
                    <div className="contents">
                        내용
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyRouter;