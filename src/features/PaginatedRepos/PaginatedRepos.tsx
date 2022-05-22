import React, {useEffect, useState} from 'react';
import {RepoResponseType} from "../../api/api";
import s from "../../pages/MainScreen/Main.module.css";
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {DataInitialStateType} from "../../store/data-reducer";

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

export const PaginatedRepos = (props: { itemsPerPage: number }) => {
    const data = useSelector<AppRootStateType, DataInitialStateType>(state => state.data)

    const items = data.repos;

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
    }, [itemOffset, props.itemsPerPage, items]);

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