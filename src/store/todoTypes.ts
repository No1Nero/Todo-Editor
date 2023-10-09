import { ITodo } from "../models/ITodo";

export interface initialStateType {
    todos: ITodo[],
    statusFilter: string,
};

export enum TodoActionTypes {
    CREATE_TODO = 'CREATE_TODO',
    CHANGE_STATUS = 'CHANGE_STATUS',
    DELETE_TODO = 'DELETE_TODO',
    EDIT_TODO = 'EDIT_TODO',
    CHANGE_FILTER = 'CHANGE_FILTER',
    CLEAR_COMPLETED = 'CLEAR_COMPLETED',
};

interface createTodoAction {
    type: TodoActionTypes.CREATE_TODO,
    payload: ITodo,
};

interface changeTodoStatusAction {
    type: TodoActionTypes.CHANGE_STATUS,
    payload: string,
};

interface deleteTodoAction {
    type: TodoActionTypes.DELETE_TODO,
    payload: string,
};

interface editTodoAction {
    type: TodoActionTypes.EDIT_TODO,
    payload: ITodo,
};

interface changeFilterAction {
    type: TodoActionTypes.CHANGE_FILTER,
    payload: string,
};

interface clearCompletedAction {
    type: TodoActionTypes.CLEAR_COMPLETED,
};

export type TodoAction = createTodoAction | changeTodoStatusAction | deleteTodoAction | editTodoAction | changeFilterAction | clearCompletedAction;
