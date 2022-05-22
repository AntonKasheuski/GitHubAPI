import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {dataReducer} from "./data-reducer";



export const rootReducer  = combineReducers({
    app: appReducer,
    data: dataReducer,
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.store = store