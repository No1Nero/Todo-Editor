import { useTypedSelector } from '../../store/useTypedSelector';
import TodoItem from '../TodoItem/TodoItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './TodoList.module.css';

export default function TodoList() {
    const todos = useTypedSelector(state => state.todo.todos);
    
    return (
        <TransitionGroup component='ul' className={styles.list} >
        {todos.map(item => (
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
    );
};
