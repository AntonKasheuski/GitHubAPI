import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {DataInitialStateType} from "../../store/data-reducer";
import {Navigate} from "react-router-dom";
import s from "./Main.module.css";
import followerIcon from "./../../img/follower.png";
import followersIcon from "./../../img/followers.png";
import {RepoResponseType} from "../../api/api";
import ReactPaginate from "react-paginate";
import {PaginatedRepos} from "../../features/PaginatedRepos/PaginatedRepos";

export const Main = () => {
    const isFind = useSelector<AppRootStateType, string>(state => state.app.isFind)
    const data = useSelector<AppRootStateType, DataInitialStateType>(state => state.data)

    const numberToShow = (number: number) => {
        if (number >= 10000) {
            return (number / 1000).toString().slice(0, -2) + 'k'
        } else {
            return number
        }
    }

    if (isFind === 'userNotFound') {
        return <Navigate to={'/userNotFound'}/>
    }
    if (data.login === '') {
        return <Navigate to={'/initial'}/>
    }

    return (
        <div className={s.main}>
            <div className={s.userBlock}>
                <div className={s.userData}>
                    <img
                        className={s.avatar}
                        src={data.avatar_url}
                        alt={'avatar'}
                    />
                    <div>
                        <h1 className={s.name}>{data.name}</h1>
                        <div>
                            <a
                                className={s.login}
                                target={"_blank"}
                                rel={"noopener noreferrer"}
                                href={data.html_url}
                            >{data.login}</a>
                        </div>
                        <div className={s.followingBlock}>
                            <div className={s.follo}>
                                <img
                                    className={s.followersIcon}
                                    src={followersIcon}
                                    alt={'followersIcon'}
                                />
                                <div>{numberToShow(data.followers)} followers</div>
                            </div>
                            <div className={s.follo}>
                                <img
                                    className={s.followerIcon}
                                    src={followerIcon}
                                    alt={'followerIcon'}
                                />
                                <div>{numberToShow(data.following)} following</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.reposBlock}>
                <div className={s.userRepos}>
                    <h1>Repositories ({data.public_repos})</h1>
                    <PaginatedRepos itemsPerPage={4}/>
                </div>
            </div>
        </div>
    );
}