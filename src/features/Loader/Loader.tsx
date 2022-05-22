import React from 'react';
import s from "./Loader.module.css"

export const Loader = (props: { type: string }) => {
    return (
        <div className={props.type === "reposIsLoading" ? `${s.repos} ${s.wrapper}` : s.wrapper}>
            <div className={s.loader}></div>
        </div>
    )
}