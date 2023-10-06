import { ITodo } from "../models/ITodo";
import { TodoAction, TodoActionTypes, initialStateType } from "./todoTypes";

const initialState: initialStateType = {
    todos: [],
    statusFilter: 'all',
};

export const todoReducer = (state = initialState, action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.CREATE_TODO:
            return {...state, todos: [action.payload, ...state.todos]};

        case TodoActionTypes.CHANGE_STATUS:
            return {...state, todos: state.todos.map((todo: ITodo) => (
                todo.id === action.payload 
                ? {...todo, status: !todo.status} 
                : todo
            ))};

        case TodoActionTypes.DELETE_TODO:
            return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)};

        case TodoActionTypes.EDIT_TODO:
            return {...state, todos: state.todos.map((todo: ITodo) => (
                todo.id === action.payload.id 
                ? {...action.payload}
                : todo
            ))};

        case TodoActionTypes.CHANGE_FILTER:
            return {...state, statusFilter: action.payload};

        case TodoActionTypes.CLEAR_COMPLETED:
            return {...state, todos: state.todos.filter(todo => !todo.status)};

        default: return state;
    };
};
