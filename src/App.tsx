import { useEffect, useState } from "react";
import CreateInput from "./components/CreateInput/CreateInput";
import styles from "./App.module.css";
import { ITodo } from "./models/ITodo";
import { useDispatch } from "react-redux";
import { TodoActionTypes } from "./store/todoTypes";
import TodoList from "./components/TodoList/TodoList";
import Modal from "./components/Modal/Modal";
import FilterMenu from "./components/FilterMenu/FilterMenu";
import { useTypedSelector } from "./store/useTypedSelector";
import { StatusFilterConstants } from "./constants/statusFilterConstants";

export default function App() {
  const {statusFilter} = useTypedSelector(state => state.todo);
  const {todos} = useTypedSelector(state => state.todo);
  const [createInputText, setCreateInputText] = useState<string>('');
  const [isShownModal, setIsShownModal] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const filtered = todos.filter((todo: ITodo) => {
      if (statusFilter === StatusFilterConstants.ACTIVE) {
        return !todo.status;
      } else if (statusFilter === StatusFilterConstants.COMPLETED) {
        return todo.status;
      }
      return true;
    });
    setFilteredTodos([...filtered]);
  }, [statusFilter, todos]);

  const addTodo = (todo: ITodo) => {
    dispatch({type: TodoActionTypes.CREATE_TODO, payload: todo});
    setCreateInputText('');
  };

  const handleModal = () => {
    setIsShownModal(isShownModal => !isShownModal);
  };

  return (
    <div className={isShownModal ? styles.modal_opened : styles.modal_closed}>
      {isShownModal && <Modal filteredTodos={filteredTodos} onSetCreateInputText={setCreateInputText} onHandleModal={handleModal} createInputText={createInputText} onAddTodo={addTodo} />}
      <header className={styles.header}>Todo Editor</header>
      <div className={styles.container}>
        <CreateInput filteredTodos={filteredTodos} onHandleModal={handleModal} createInputText={createInputText} onSetCreateInputText={setCreateInputText} onAddTodo={addTodo} />
        <FilterMenu />
        <TodoList todos={filteredTodos} />
      </div>
    </div>
  );
}
