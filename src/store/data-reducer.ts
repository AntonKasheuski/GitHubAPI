import {Dispatch} from "redux";
import {API, RepoResponseType, UserResponseType} from "../api/api";
import {setIsLoaderAC, userSearchingResultAC} from "./app-reducer";

enum DataActionType {
    SET_USER = 'DataActionType/SET_USER',
    SET_REPOS = 'DataActionType/SET_REPOS',
}

export type DataInitialStateType = UserResponseType & { repos: RepoResponseType[] }

const dataInitialState: DataInitialStateType = {
    login: '',
    avatar_url: '',
    html_url: '',
    name: null,
    public_repos: 0,
    followers: 0,
    following: 0,
    repos: []
}

type UserReducerActionType = SetUserActionType | SetReposActionType;

export const dataReducer = (state: DataInitialStateType = dataInitialState, action: UserReducerActionType): DataInitialStateType => {
    switch (action.type) {
        case DataActionType.SET_USER:
            return {...state, ...action.payload};
        case DataActionType.SET_REPOS:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export type SetUserActionType = ReturnType<typeof setUserAC>
export const setUserAC = (login: string, avatar_url: string, html_url: string, name: string | null, public_repos: number, followers: number, following: number) => {
    return {
        type: DataActionType.SET_USER,
        payload: {
            login,
            avatar_url,
            html_url,
            name,
            public_repos,
            followers,
            following,
        },
    } as const
}
export type SetReposActionType = ReturnType<typeof setReposAC>
export const setReposAC = (repos: RepoResponseType[]) => {
    return {
        type: DataActionType.SET_REPOS,
        payload: {
            repos
        }
    } as const
}

export const getUserTC = (userName: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoaderAC(true));
    API.getUser(userName)
        .then(res => {
            dispatch(setUserAC(res.login, res.avatar_url, res.html_url, res.name, res.public_repos, res.followers, res.following))
            dispatch(userSearchingResultAC('userIsFound'))
            API.getRepos(userName)
                .then(res => {
                    const repos = res.map(r => {
                        return {
                            id: r.id,
                            name: r.name,
                            html_url: r.html_url,
                            description: r.description
                        }
                    })
                    dispatch(setReposAC(repos))
                    dispatch(setIsLoaderAC(false));
                })
        })
        .catch(() => {
            dispatch(setIsLoaderAC(false));
            dispatch(userSearchingResultAC('userNotFound'))
        })
}