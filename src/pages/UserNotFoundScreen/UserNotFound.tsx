import React from 'react';
import s from "./UserNotFound.module.css";
import userNotFoundIcon from "../../img/userNotFound-logo.png";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";

export const UserNotFound = () => {
    const isFind = useSelector<AppRootStateType, string>(state => state.app.isFind)
    const login = useSelector<AppRootStateType, string>(state => state.data.login)

    if (isFind === 'userIsFound') {
        return <Navigate to={'/main'}/>
    }
    if (login === '') {
        return <Navigate to={'/initial'}/>
    }

    return (
        <div className={s.main}>
            <img alt={"userNotFoundIcon"} src={userNotFoundIcon}/>
            <div>User not found</div>
        </div>
    );
}