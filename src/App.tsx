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
    if (formattedInputText.length > 70) {
      formattedInputText.slice(0, 70);
    } else {
      setCreateInputText(formattedInputText);
    }
  };

  const formatDate = (date: any) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
  };

  return (
    <div style={isShownModal ? {overflowY: 'hidden'} : {overflowY: 'visible'}}>
      {isShownModal && <Modal onSetCreateInputText={setCreateInputText} onFormatDate={formatDate} onSetIsShownModal={setIsShownModal} createInputText={createInputText} onHandleInputText={handleInputText} onAddTodo={addTodo} />}
      <header className={styles.header}>Todo Editor</header>
      <div className={styles.container}>
        <CreateInput onFormatDate={formatDate} createInputText={createInputText} onHandleInputText={handleInputText} onAddTodo={addTodo} onSetIsShownModal={setIsShownModal} />
        <TodoList />
      </div>
    </div>
  );
}
