import { ITodo } from "../models/ITodo";
import { filterTodos } from "./filterTodos";

export const todoCounter = (todos: ITodo[], filter: string) => {
    const todoCount = filterTodos(todos, filter).length;

    if (todoCount) {
        return todoCount;
    } else {
        return null;
    }
};
