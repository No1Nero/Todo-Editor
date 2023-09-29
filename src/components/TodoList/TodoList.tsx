import { useTypedSelector } from '../../store/useTypedSelector';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

export default function TodoList() {
    const todos = useTypedSelector(state => state.todo.todos);
    
    return (
        <ul className={styles.list}>
            {todos.map(item => (
                <li className={styles.item_wrapper} key={item.id}>
                    <TodoItem item={item} />
                </li>
            ))}
        </ul>
    );
};
