import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/todoTypes';
import { StatusFilterConstants } from '../../constants/statusFilterConstants';
import styles from './FilterMenu.module.css';
import { useTypedSelector } from '../../store/useTypedSelector';
import classNames from 'classnames';

export default function FilterMenu() {
    const {statusFilter} = useTypedSelector(state => state.todo);
    const dispatch = useDispatch();

    const handleStatusFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({type: TodoActionTypes.CHANGE_FILTER, payload: e.currentTarget.value});
    };

    const clearCompletedTodos = () => {
        dispatch({type: TodoActionTypes.CLEAR_COMPLETED});
    };

    return (
        <>
            <div className={styles.filter_container}>
                <button 
                    className={statusFilter === StatusFilterConstants.ALL ? classNames(styles.filter_button, styles.chosen_filter) : styles.filter_button} 
                    onClick={handleStatusFilter} 
                    type="button" 
                    value={StatusFilterConstants.ALL}>
                        All
                </button>
                <button 
                    className={statusFilter === StatusFilterConstants.ACTIVE ? classNames(styles.filter_button, styles.chosen_filter) : styles.filter_button} 
                    onClick={handleStatusFilter} 
                    type="button" 
                    value={StatusFilterConstants.ACTIVE}>
                        Active
                </button>
                <button 
                    className={statusFilter === StatusFilterConstants.COMPLETED ? classNames(styles.filter_button, styles.chosen_filter) : styles.filter_button} 
                    onClick={handleStatusFilter} 
                    type="button" 
                    value={StatusFilterConstants.COMPLETED}>
                        Completed
                </button>
            </div>
            <div className={styles.delete_container}>
                <button onClick={clearCompletedTodos} className={styles.delete_button} type='button'>Delete completed</button>
            </div>
        </>
    );
};
