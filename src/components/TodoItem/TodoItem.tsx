import { ITodo } from '../../models/ITodo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
    item: ITodo,
};

export default function TodoItem({item}: TodoItemProps) {
    const {title, creationDate, expirationDate} = item;

    return (
        <div className={styles.container}>
            <div className={styles.content_wrapper}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.date}>Created: {creationDate}</p>
                <p className={styles.date}>Expires: {expirationDate}</p>
            </div>
        </div>
    );
};
