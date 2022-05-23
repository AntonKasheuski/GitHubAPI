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
                </div>)
            }
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

    const startItemOnPage = props.itemsPerPage * (data.currentPage - 1) + 1
    const endItemOnPage = data.currentPage * props.itemsPerPage < data.public_repos
        ? data.currentPage * props.itemsPerPage
        : data.public_repos

    return (
        <>
            <Items currentItems={data.repos}/>
            <div className={s.paginateContainer}>
                <div className={s.itemsCount}>
                    {startItemOnPage} - {endItemOnPage} of {data.public_repos} items
                </div>
                <ReactPaginate
                    forcePage={data.currentPage - 1}
                    nextLabel={">"}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel={"<"}
                    pageClassName={s.pageItem}
                    previousClassName={s.pageItem}
                    nextClassName={s.pageItem}
                    breakLabel={"..."}
                    breakClassName={s.pageItem}
                    containerClassName={s.pagination}
                    activeClassName={s.active}
                />
            </div>
        </>
    )
}