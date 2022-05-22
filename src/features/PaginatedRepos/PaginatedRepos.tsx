import React, {useEffect} from 'react';
import {RepoResponseType} from "../../api/api";
import s from "./PaginatedRepos.module.css";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {DataInitialStateType, getReposTC, setCurrentPageAC} from "../../store/data-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

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
    )
}

export const PaginatedRepos = (props: { itemsPerPage: number }) => {
    const data = useSelector<AppRootStateType, DataInitialStateType>(state => state.data)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, {}, AnyAction>>()

    const pageCount = Math.ceil(data.public_repos / props.itemsPerPage)

    useEffect(() => {
        data.login && dispatch(getReposTC(data.login, props.itemsPerPage, data.currentPage))
    }, [dispatch, data.login, data.currentPage, props.itemsPerPage]);

    const handlePageClick = (event: { selected: number }) => {
        dispatch(setCurrentPageAC(event.selected + 1))
    }

    return (
        <>
            <Items currentItems={data.repos}/>
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