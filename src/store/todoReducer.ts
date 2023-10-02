import { ITodo } from "../models/ITodo";
import { TodoAction, TodoActionTypes, initialStateType } from "./types";

const initialState: initialStateType = {
    todos: [],
};

export const todoReducer = (state = initialState, action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.CREATE_TODO:
            return {todos: [action.payload, ...state.todos]};

        case TodoActionTypes.CHANGE_STATUS:
            return {todos: state.todos.map((todo: ITodo) => (
                todo.id === action.payload 
                ? {...todo, status: !todo.status} 
                : todo
            ))};

        default: return initialState;
    };
};
