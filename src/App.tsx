import { useState } from "react";
import CreateInput from "./components/CreateInput/CreateInput";
import styles from "./App.module.css";
import { ITodo } from "./models/ITodo";
import { useDispatch } from "react-redux";
import { TodoActionTypes } from "./store/types";
import TodoList from "./components/TodoList/TodoList";
import Modal from "./components/Modal/Modal";

export default function App() {
  const [createInputText, setCreateInputText] = useState<string>('');
  const [isShownModal, setIsShownModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const addTodo = (todo: ITodo) => {
    dispatch({type: TodoActionTypes.CREATE_TODO, payload: todo});
    setCreateInputText('');
  };

  const handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
    const formattedInputText = e.currentTarget.value.replace(/[{}+/@#$%^&*|;:<>=_]/g, '');
    const maxInputLength = 70;
    if (formattedInputText.length > maxInputLength) {
      formattedInputText.slice(0, maxInputLength);
    } else {
      setCreateInputText(formattedInputText);
    }
  };

  return (
    <div className={isShownModal ? styles.modal_opened : styles.modal_closed}>
      {isShownModal && <Modal onSetCreateInputText={setCreateInputText} onSetIsShownModal={setIsShownModal} createInputText={createInputText} onHandleInputText={handleInputText} onAddTodo={addTodo} />}
      <header className={styles.header}>Todo Editor</header>
      <div className={styles.container}>
        <CreateInput onSetIsShownModal={setIsShownModal} createInputText={createInputText} onHandleInputText={handleInputText} onAddTodo={addTodo} />
        <TodoList />
      </div>
    </div>
  );
}
