import React from 'react';
import s from "./Initial.module.css";
import searchIcon from "./../../img/search-logo.png"
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

export const Initial = () => {
    const isFind = useSelector<AppRootStateType, string>(state => state.app.userIsFind)

    if (isFind === 'userIsFound') {
        return <Navigate to={'/main'}/>
    }
    if (isFind === 'userNotFound') {
        return <Navigate to={'/userNotFound'}/>
    }

    return (
        <div className={s.main}>
            <img alt={"searchIcon"} src={searchIcon}/>
            <div>Start with searching</div>
            <div>a GitHub user</div>
        </div>
    );
}