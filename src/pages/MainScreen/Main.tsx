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

export const Main = () => {
    const isFind = useSelector<AppRootStateType, string>(state => state.app.isFind)
    const data = useSelector<AppRootStateType, DataInitialStateType>(state => state.data)
    const items = data.repos;

    const numberToShow = (number: number) => {
        if (number >= 10000) {
            return (number / 1000).toString().slice(0, -2) + 'k'
        } else {
            return number
        }
    }

    function Items(props: { currentItems: RepoResponseType[] }) {
        return (
            <>
                {props.currentItems && props.currentItems.map(r =>
                    <div
                        key={r.id}
                        className={s.repo}
                    >
                        <a
                            className={s.repoName}
                            target={"_blank"}
                            rel={"noopener noreferrer"}
                            href={r.html_url}
                        >{r.name}</a>
                        <div className={s.repoDescription}>{r.description}</div>
                    </div>)}
            </>
        );
    }

    function PaginatedItems(props: { itemsPerPage: number }) {
        // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState<RepoResponseType[]>([]);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + props.itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / props.itemsPerPage));
        }, [itemOffset, props.itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event: { selected: number; }) => {
            const newOffset = event.selected * props.itemsPerPage % items.length;
            console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems}/>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </>
        );
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
                    <PaginatedItems itemsPerPage={4}/>
                </div>
            </div>
        </div>
    );
}