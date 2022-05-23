import React from 'react';
import s from "./ReposNotFound.module.css";
import reposNotFoundIcon from "../../img/reposNotFound-logo.png";

export const ReposNotFound = () => {
    return (
        <div className={s.main}>
            <img alt={"reposNotFoundIcon"} src={reposNotFoundIcon}/>
            <div>Repository list is empty</div>
        </div>
    )
}