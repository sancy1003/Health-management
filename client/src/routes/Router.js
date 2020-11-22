import React, { Fragment } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Switch, Route, Redirect } from "react-router-dom";
import LockerList from "./normalRoute/LockerList";

const MyRouter = () => {
    return (
        <div className="health-navi">
            <Sidebar/>
            <div className="main">
                <Header/>
                <div className="container">
                    <div className="contents">
                        <Switch>
                            <Route path="/" exact component={LockerList} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyRouter;