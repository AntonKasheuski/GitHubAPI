enum AppActionType {
    USER_IS_LOADING = 'AppActionType/USER_IS_LOADING',
    REPOS_IS_LOADING = 'AppActionType/REPOS_IS_LOADING',
    USER_SEARCHING_RESULT = 'AppActionType/USER_SEARCHING_RESULT',
    REPOS_SEARCHING_RESULT = 'AppActionType/REPOS_SEARCHING_RESULT',
    SET_CURRENT_PAGE = 'AppActionType/SET_CURRENT_PAGE',
    SET_SEARCH_ERROR = 'AppActionType/SET_SEARCH_ERROR',
}

type InitialStateType = {
    usersIsLoading: boolean
    reposIsLoading: boolean
    userIsFind: string
    reposIsFind: string
    currentPage: number
    searchError: boolean
}

const initialState: InitialStateType = {
    usersIsLoading: false,
    reposIsLoading: false,
    userIsFind: '',
    reposIsFind: '',
    currentPage: 1,
    searchError: false,
}

type AppReducerActionType = UserIsLoadingType
    | ReposIsLoadingType
    | UserSearchingActionType
    | ReposSearchingActionType
    | SetCurrentPageActionType
    | SetSearchErrorActionType

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case AppActionType.USER_IS_LOADING:
            return {...state, usersIsLoading: action.payload.usersIsLoading}
        case AppActionType.REPOS_IS_LOADING:
            return {...state, reposIsLoading: action.payload.reposIsLoading}
        case AppActionType.USER_SEARCHING_RESULT:
            return {...state, userIsFind: action.payload.userIsFind}
        case AppActionType.REPOS_SEARCHING_RESULT:
            return {...state, reposIsFind: action.payload.reposIsFind}
        case AppActionType.SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload.page}
        case AppActionType.SET_SEARCH_ERROR:
            return {...state, searchError: action.payload.searchError}
        default:
            return state;
    }
}

export type UserIsLoadingType = ReturnType<typeof userIsLoadingAC>;
export const userIsLoadingAC = (usersIsLoading: boolean) => {
    return {
        type: AppActionType.USER_IS_LOADING,
        payload: {
            usersIsLoading,
        },
    } as const
}
export type ReposIsLoadingType = ReturnType<typeof reposIsLoadingAC>;
export const reposIsLoadingAC = (reposIsLoading: boolean) => {
    return {
        type: AppActionType.REPOS_IS_LOADING,
        payload: {
            reposIsLoading,
        },
    } as const
}
export type UserSearchingActionType = ReturnType<typeof userSearchingResultAC>;
export const userSearchingResultAC = (userIsFind: string) => {
    return {
        type: AppActionType.USER_SEARCHING_RESULT,
        payload: {
            userIsFind,
        },
    } as const
}
export type ReposSearchingActionType = ReturnType<typeof reposSearchingResultAC>;
export const reposSearchingResultAC = (reposIsFind: string) => {
    return {
        type: AppActionType.REPOS_SEARCHING_RESULT,
        payload: {
            reposIsFind,
        },
    } as const
}
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>;
export const setCurrentPageAC = (page: number) => {
    return {
        type: AppActionType.SET_CURRENT_PAGE,
        payload: {
            page,
        },
    } as const
}
export type SetSearchErrorActionType = ReturnType<typeof setSearchErrorAC>;
export const setSearchErrorAC = (searchError: boolean) => {
    return {
        type: AppActionType.SET_SEARCH_ERROR,
        payload: {
            searchError,
        },
    } as const
}