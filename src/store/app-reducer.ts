enum AppActionType {
    USER_IS_LOADING = 'AppActionType/USER_IS_LOADING',
    REPOS_IS_LOADING = 'AppActionType/REPOS_IS_LOADING',
    USER_SEARCHING_RESULT = 'AppActionType/USER_SEARCHING_RESULT',
    SET_CURRENT_PAGE = 'AppActionType/SET_CURRENT_PAGE',
}

type InitialStateType = {
    usersIsLoading: boolean
    reposIsLoading: boolean
    isFind: string
    currentPage: number
}

const initialState: InitialStateType = {
    usersIsLoading: false,
    reposIsLoading: false,
    isFind: '',
    currentPage: 1,
}

type AppReducerActionType = UserIsLoadingType | ReposIsLoadingType | UserSearchingActionType | SetCurrentPageActionType;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case AppActionType.USER_IS_LOADING:
            return {...state, usersIsLoading: action.payload.usersIsLoading}
        case AppActionType.REPOS_IS_LOADING:
            return {...state, reposIsLoading: action.payload.reposIsLoading}
        case AppActionType.USER_SEARCHING_RESULT:
            return {...state, isFind: action.payload.isFind}
        case AppActionType.SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload.page}
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
export const userSearchingResultAC = (isFind: string) => {
    return {
        type: AppActionType.USER_SEARCHING_RESULT,
        payload: {
            isFind,
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