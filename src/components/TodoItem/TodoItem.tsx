import { ITodo } from '../../models/ITodo';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/types';
import { BsTrash } from 'react-icons/bs';
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

    const deleteTodo = () => {
        dispatch({type: TodoActionTypes.DELETE_TODO, payload: id});
    };

    return (
        <div className={styles.container}>
            <div className={styles.content_wrapper}>
                <div className={styles.header_wrapper}>
                    <input className={styles.checkbox} type="checkbox" checked={status} onChange={handleStatusChange}/>
                    <h1 className={status ? classNames(styles.title, styles.checked_title ) : styles.title}>{title}</h1>
                </div>
                <div className={styles.date_container}>
                    <p className={styles.date}>Created: {creationDate}</p>
                    <p className={styles.date}>Expires: {expirationDate}</p>
                </div>
                <div className={styles.button_container}>
                    <button onClick={deleteTodo} className={styles.delete_button} type='button'><BsTrash size={35} color='red' /></button>
                </div>
            </div>
        </div>
    );
};
