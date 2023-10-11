import { useEffect, useState } from "react";
import CreateInput from "./components/CreateInput/CreateInput";
import "./App.scss";
import { ITodo } from "./models/ITodo";
import { useDispatch } from "react-redux";
import { TodoActionTypes } from "./store/todoTypes";
import TodoList from "./components/TodoList/TodoList";
import Modal from "./components/Modal/Modal";
import FilterMenu from "./components/FilterMenu/FilterMenu";
import { useTypedSelector } from "./store/useTypedSelector";
import { filterTodos } from "./utils/filterTodos";
import { ThemeContext } from "./context/themeContext"
import Header from "./components/Header/Header";
import { getLocalStorageData, setLocalStorageData } from "./utils/localStorageUtils";
import { ThemeConstants } from "./constants/themeConstants";

export default function App() {
  const {todos, statusFilter} = useTypedSelector(state => state.todo);
  const [createInputText, setCreateInputText] = useState<string>('');
  const [isShownModal, setIsShownModal] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
  const [theme, setTheme] = useState<string>(ThemeConstants.LIGHT);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, statusFilter));
  }, [statusFilter, todos]);

  useEffect(() => {
    const storageTheme = getLocalStorageData('theme');
    if (storageTheme) {
      setTheme(storageTheme);
    } else {
      setTheme(ThemeConstants.LIGHT);
    }
  }, []);

  useEffect(() => {
    setLocalStorageData('theme', theme);
  }, [theme]);

  const addTodo = (todo: ITodo) => {
    dispatch({type: TodoActionTypes.CREATE_TODO, payload: todo});
    setCreateInputText('');
  };

  const handleModal = () => {
    setIsShownModal(isShownModal => !isShownModal);
  };

  const toggleTheme = () => {
    setTheme(theme => (theme === ThemeConstants.LIGHT ? ThemeConstants.DARK : ThemeConstants.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div id={theme} className={isShownModal ? 'modal_opened' : 'modal_closed'}>
        {isShownModal && <Modal filteredTodos={filteredTodos} onSetCreateInputText={setCreateInputText} onHandleModal={handleModal} createInputText={createInputText} onAddTodo={addTodo} />}
        <Header />
        <div className='app_container'>
          <CreateInput filteredTodos={filteredTodos} onHandleModal={handleModal} createInputText={createInputText} onSetCreateInputText={setCreateInputText} onAddTodo={addTodo} />
          <TodoList filteredTodos={filteredTodos}>
            <FilterMenu />
          </TodoList>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
