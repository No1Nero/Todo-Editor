import TodoItem from '../TodoItem/TodoItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './TodoList.module.css';
import { ITodo } from '../../models/ITodo';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';

interface TodoListProps {
    todos: ITodo[],
};
export default function TodoList({todos}: TodoListProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [searchedTodos, setSearchedTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        setSearchedTodos(todos.filter(todo => todo.title.toLowerCase().includes(searchText.toLowerCase())));
    }, [todos, searchText]);

    return (
        <>
        <SearchBar searchText={searchText} onSetSearchText={setSearchText} />
        {searchedTodos.length
        ?
        <TransitionGroup component='ul' className={styles.list} >
        {searchedTodos.map(item => (
            <CSSTransition key={item.id} timeout={300} 
            classNames={{
                enter: styles.item_enter,
                enterActive: styles.item_enter_active,
                exit: styles.item_exit,
                exitActive: styles.item_exit_active,
            }}>
                <li key={item.id}>
                    <TodoItem item={item} />
                </li>
            </CSSTransition>
        ))}
        </TransitionGroup>
        : 
        <div className={styles.empty_message}>{'Oops, nothing here :('}</div>
        }
        </>
    );
};
