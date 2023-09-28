import { ITodo } from "../models/ITodo";

export interface initialStateType {
    todos: ITodo[]
};

export enum TodoActionTypes {
    CREATE_TODO = 'CREATE_TODO',
    
};

interface createTodoAction {
    type: TodoActionTypes.CREATE_TODO,
    payload: ITodo,
};



export type TodoAction = createTodoAction;
