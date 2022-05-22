enum AppActionType {
    SET_IS_LOADER = 'AppActionType/SET_IS_LOADER',
    USER_SEARCHING_RESULT = 'AppActionType/USER_SEARCHING_RESULT',
    SET_CURRENT_PAGE = 'AppActionType/SET_CURRENT_PAGE',
}

type InitialStateType = {
    isLoading: boolean
    isFind: string
    currentPage: number
}

const initialState: InitialStateType = {
    isLoading: false,
    isFind: '',
    currentPage: 1,
}

type AppReducerActionType = SetIsLoadingType | UserSearchingActionType | setCurrentPageActionType;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case AppActionType.SET_IS_LOADER:
            return {...state, isLoading: action.payload.isLoading}
        case AppActionType.USER_SEARCHING_RESULT:
            return {...state, isFind: action.payload.isFind}
        case AppActionType.SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload.page}
        default:
            return state;
    }
}

export type SetIsLoadingType = ReturnType<typeof setIsLoaderAC>;
export const setIsLoaderAC = (isLoading: boolean) => {
    return {
        type: AppActionType.SET_IS_LOADER,
        payload: {
            isLoading,
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
export type setCurrentPageActionType = ReturnType<typeof setCurrentPageAC>;
export const setCurrentPageAC = (page: number) => {
    return {
        type: AppActionType.SET_CURRENT_PAGE,
        payload: {
            page,
        },
    } as const
}