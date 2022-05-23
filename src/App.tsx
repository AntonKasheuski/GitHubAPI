import React, {KeyboardEvent} from 'react';
import './App.module.css';
import {Initial} from "./pages/InitialScreen/Initial";
import {Main} from "./pages/MainScreen/Main";
import githubIcon from "./img/github-logo.png";
import searchIcon from "./img/search-logo.png"
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store/store";
import {AnyAction} from "redux";
import {getUserTC} from "./store/data-reducer";
import s from "./App.module.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserNotFound} from "./pages/UserNotFoundScreen/UserNotFound";
import {Loader} from "./features/Loader/Loader";
import {setSearchErrorAC} from "./store/app-reducer";

function App() {
    const usersIsLoading = useSelector<AppRootStateType, boolean>(state => state.app.usersIsLoading)
    const reposIsLoading = useSelector<AppRootStateType, boolean>(state => state.app.reposIsLoading)
    const searchError = useSelector<AppRootStateType, boolean>(state => state.app.searchError)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, {}, AnyAction>>()

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (e.currentTarget.value !== "") {
                dispatch(getUserTC(e.currentTarget.value))
            } else {
                dispatch(setSearchErrorAC(true))
            }
        }
    }

    return (
        <div>
            <div className={s.header}>
                <img src={githubIcon} alt={'githubIcon'}/>
                <div className={s.inputWrapper}>
                    <input
                        autoFocus
                        className={searchError ? `${s.input} ${s.error}` : s.input}
                        placeholder={"Enter GitHub Username"}
                        onKeyDown={onKeyPressHandler}
                        onChange={() => dispatch(setSearchErrorAC(false))}
                    />
                    <img src={searchIcon} alt={'searchIcon'}/>
                </div>
            </div>
            {usersIsLoading && <Loader type={"usersIsLoading"}/>}
            {reposIsLoading && <Loader type={"reposIsLoading"}/>}
            <Routes>
                <Route path="/" element={<Navigate replace to="/initial"/>}/>
                <Route path={'/initial'} element={<Initial/>}/>
                <Route path={'/userNotFound'} element={<UserNotFound/>}/>
                <Route path={'/main'} element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default App;