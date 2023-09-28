import { TodoAction, TodoActionTypes, initialStateType } from "./types";

const initialState: initialStateType = {
    todos: [],
};

export const todoReducer = (state = initialState, action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.CREATE_TODO:
            return {todos: [...state.todos, action.payload]};

        default: return initialState;
    };
};
