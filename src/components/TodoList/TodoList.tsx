import { useTypedSelector } from '../../store/useTypedSelector';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

export default function TodoList() {
    const todos = useTypedSelector(state => state.todo.todos);
    
    return (
        <div className={styles.list}>
            {todos.map(item => (
                <div className={styles.item_wrapper} key={item.id}>
                    <TodoItem item={item} />
                </div>
            ))}
        </div>
    );
};
