import { TodoAction, TodoActionTypes, initialStateType } from "./types";

const initialState: initialStateType = {
    todos: [],
};

export const todoReducer = (state = initialState, action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.CREATE_TODO:
            return {todos: [...state.todos, action.payload]};

        case TodoActionTypes.DELETE_TODO:
            return {todos: state.todos.filter(todo => todo.id !== action.payload)};

        case TodoActionTypes.CHANGE_TODO:
            return {todos: state.todos.map(todo => (
                todo.id === action.payload.id 
                ? {...action.payload}
                : todo
            ))};

        default: return initialState;
    };
};
