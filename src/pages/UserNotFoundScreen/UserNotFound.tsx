import React from 'react';
import s from "./UserNotFound.module.css";
import userNotFoundIcon from "../../img/userNotFound-logo.png";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";

export const UserNotFound = () => {
    const userIsFind = useSelector<AppRootStateType, string>(state => state.app.userIsFind)

    if (userIsFind === 'userIsFound') {
        return <Navigate to={'/main'}/>
    }
    if (userIsFind === '') {
        return <Navigate to={'/main'}/>
    }

    return (
        <div className={s.main}>
            <img alt={"userNotFoundIcon"} src={userNotFoundIcon}/>
            <div>User not found</div>
        </div>
    );
}