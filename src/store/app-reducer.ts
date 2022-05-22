enum AppActionType {
    SET_IS_LOADER = 'AppActionType/SET_IS_LOADER',
    USER_SEARCHING_RESULT = 'AppActionType/USER_SEARCHING_RESULT',
}

type InitialStateType = {
    isLoading: boolean
    isFind: string
}

const initialState: InitialStateType = {
    isLoading: false,
    isFind: '',
}

type AppReducerActionType = SetIsLoadingType | UserSearchingActionType;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case AppActionType.SET_IS_LOADER:
            return {...state, isLoading: action.payload.isLoading}
        case AppActionType.USER_SEARCHING_RESULT:
            return {...state, isFind: action.payload.isFind};
        default:
            return state;
    }
}

export type SetIsLoadingType = ReturnType<typeof setIsLoader>;
export const setIsLoader = (isLoading: boolean) => {
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