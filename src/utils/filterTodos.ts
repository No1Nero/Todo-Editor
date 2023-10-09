import { StatusFilterConstants } from "../constants/statusFilterConstants";
import { ITodo } from "../models/ITodo";

export const filterTodos = (todos: ITodo[], filter: string) => {
    const filtered = todos.filter((todo: ITodo) => {
        if (filter === StatusFilterConstants.ACTIVE) {
          return !todo.status;
        } else if (filter === StatusFilterConstants.COMPLETED) {
          return todo.status;
        }
        return true;
      });
    return [...filtered];
};
