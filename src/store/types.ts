import { ITodo } from "../models/ITodo";

export interface initialStateType {
    todos: ITodo[]
};

export enum TodoActionTypes {
    CREATE_TODO = 'CREATE_TODO',
    CHANGE_STATUS = 'CHANGE_STATUS',
};

interface createTodoAction {
    type: TodoActionTypes.CREATE_TODO,
    payload: ITodo,
};

interface changeTodoStatusAction {
    type: TodoActionTypes.CHANGE_STATUS,
    payload: string,
};

export type TodoAction = createTodoAction | changeTodoStatusAction;
