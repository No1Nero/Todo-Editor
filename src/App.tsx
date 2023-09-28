import { useState } from "react";
import CreateInput from "./components/CreateInput/CreateInput";
import styles from "./App.module.css";
import { ITodo } from "./models/ITodo";
import { useDispatch } from "react-redux";
import { TodoActionTypes } from "./store/types";
import TodoList from "./components/TodoList/TodoList";
import { useTypedSelector } from "./store/useTypedSelector";

export default function App() {
  const [createInputText, setCreateInputText] = useState<string>('');
  const dispatch = useDispatch();

  const addTodo = (todo: ITodo) => {
    dispatch({type: TodoActionTypes.CREATE_TODO, payload: todo});
    setCreateInputText('');
  };

  return (
    <div>
      <header className={styles.header}>Todo Editor</header>
      <div className={styles.container}>
        <CreateInput createInputText={createInputText} onSetCreateInputText={setCreateInputText} onAddTodo={addTodo} />
        <TodoList />
      </div>
    </div>
  );
}
