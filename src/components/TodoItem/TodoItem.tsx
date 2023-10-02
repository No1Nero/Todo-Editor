import { ITodo } from '../../models/ITodo';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/types';
import styles from './TodoItem.module.css';
import classNames from 'classnames';

interface TodoItemProps {
    item: ITodo,
};

export default function TodoItem({item}: TodoItemProps) {
    const {title, creationDate, expirationDate, status, id} = item;
    const dispatch = useDispatch();

    const handleStatusChange = () => {
        dispatch({type: TodoActionTypes.CHANGE_STATUS, payload: id});
    };

    return (
        <div className={styles.container}>
            <div className={styles.content_wrapper}>
                <div className={styles.header_wrapper}>
                    <input className={styles.checkbox} type="checkbox" checked={status} onChange={handleStatusChange}/>
                    <h1 className={status ? classNames(styles.title, styles.checked_title ) : styles.title}>{title}</h1>
                </div>
                <p className={styles.date}>Created: {creationDate}</p>
                <p className={styles.date}>Expires: {expirationDate}</p>
            </div>
        </div>
    );
};
