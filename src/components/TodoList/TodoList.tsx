import TodoItem from '../TodoItem/TodoItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './TodoList.scss';
import { ITodo } from '../../models/ITodo';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/todoTypes';
import { useTypedSelector } from '../../store/useTypedSelector';
import ModalContainer from '../ModalContainer/ModalContainer';
import PopUp from '../PopUp/PopUp';

interface TodoListProps {
    filteredTodos: ITodo[],
    children: React.ReactNode
};
export default function TodoList({filteredTodos, children}: TodoListProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [searchedTodos, setSearchedTodos] = useState<ITodo[]>([]);
    const [isShownPopUp, setIsShownPopUp] = useState<boolean>(false);
    const {todos} = useTypedSelector(state => state.todo);
    const dispatch = useDispatch();

    useEffect(() => {
        setSearchedTodos(filteredTodos.filter(todo => todo.title.toLowerCase().includes(searchText.toLowerCase())));
    }, [filteredTodos, searchText]);

    const clearCompletedTodos = () => {
        dispatch({type: TodoActionTypes.CLEAR_COMPLETED});
    };

    const handlePopUp = () => {
        setIsShownPopUp(isShownPopUp => !isShownPopUp);
    };

    return (
        <>
        {isShownPopUp && 
        <ModalContainer onHandleModal={handlePopUp}>
            <PopUp onClearCompletedTodos={clearCompletedTodos} onHandlePopUp={handlePopUp}/>
        </ModalContainer>
        }
        <div className='todo_list_search_container'>
            <SearchBar searchText={searchText} onSetSearchText={setSearchText} />
            <button disabled={!todos.filter(todo => todo.status).length} onClick={handlePopUp} className='todo_list_delete_button' type='button'>Delete completed</button>
        </div>
        {children}
        {searchedTodos.length
        ?
        <TransitionGroup component='ul' className='todo_list_list' >
        {searchedTodos.map(item => (
            <CSSTransition key={item.id} timeout={300} 
            classNames={{
                enter: 'todo_list_item_enter',
                enterActive: 'todo_list_item_enter_active',
                exit: 'todo_list_item_exit',
                exitActive: 'todo_list_item_exit_active',
            }}>
                <li key={item.id}>
                    <TodoItem item={item} />
                </li>
            </CSSTransition>
        ))}
        </TransitionGroup>
        : 
        <div className='todo_list_empty_message'>{'Oops, nothing here :('}</div>
        }
        </>
    );
};
