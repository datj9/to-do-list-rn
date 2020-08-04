import * as actionTypes from "./actionTypes";

const INITIAL_STATE = {
    currentUser: {},
    isAuthenticated: false,
    tasks: [],
    isLoading: false,
    isCreating: false,
    errors: {},
    isSuccess: false,
    isUpdating: false,
    isDeleting: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_TODOS_START:
            return {
                ...state,
                isLoading: true,
                tasks: [],
            };
        case actionTypes.GET_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: action.payload,
            };
        case actionTypes.GET_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: { getDataFail: true },
            };
        case actionTypes.CREATE_TODO_START:
            return {
                ...state,
                isCreating: true,
                isSuccess: false,
                errors: {},
            };
        case actionTypes.CREATE_TODO_SUCCESS:
            return {
                ...state,
                isCreating: false,
                isSuccess: true,
                tasks: state.tasks.concat([action.payload]),
                errors: {},
            };
        case actionTypes.CREATE_TODO_FAILURE:
            return {
                ...state,
                isCreating: false,
                errors: action.payload,
            };
        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
                isLoading: false,
            };
        case actionTypes.UPDATE_TODO_START:
            return {
                ...state,
                isUpdating: true,
            };
        case actionTypes.UPDATE_TODO_SUCCESS:
            const tasks = state.tasks;
            const { data, index } = action.payload;

            tasks[index] = {
                ...tasks[index],
                isDone: data.isDone,
            };

            return {
                ...state,
                tasks: tasks.concat([]),
                isUpdating: false,
            };
        case actionTypes.DELETE_TODO_START:
            return {
                ...state,
                isDeleting: true,
            };
        case actionTypes.DELETE_TODO_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case actionTypes.DELETE_TODO_FAILURE:
            return {
                ...state,
                isDeleting: false,
                errors: action.payload,
            };
        case actionTypes.SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
                errors: {},
            };
        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
                errors: {},
            };
        case actionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.SIGN_OUT_START:
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false,
            };
        case actionTypes.SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
                errors: {},
            };
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        default:
            return state;
    }
}
