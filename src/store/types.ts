import { ITodo } from "../models/ITodo";

export interface initialStateType {
    todos: ITodo[]
};

export enum TodoActionTypes {
    CREATE_TODO = 'CREATE_TODO',
    DELETE_TODO = 'DELETE_TODO',
    CHANGE_TODO = 'CHANGE_TODO',
};

interface createTodoAction {
    type: TodoActionTypes.CREATE_TODO,
    payload: ITodo,
};

interface deleteTodoAction {
    type: TodoActionTypes.DELETE_TODO,
    payload: number,
};

interface changeTodoAction {
    type: TodoActionTypes.CHANGE_TODO,
    payload: ITodo,
};

export type TodoAction = createTodoAction | deleteTodoAction | changeTodoAction;
