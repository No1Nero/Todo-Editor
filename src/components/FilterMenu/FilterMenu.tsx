import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/todoTypes';
import { StatusFilterConstants } from '../../constants/statusFilterConstants';
import styles from './FilterMenu.module.css';
import { useTypedSelector } from '../../store/useTypedSelector';
import classNames from 'classnames';
import FilterButton from '../FilterButton/FilterButton';

export default function FilterMenu() {
    const {statusFilter, todos} = useTypedSelector(state => state.todo);
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
                <FilterButton title='All' value={StatusFilterConstants.ALL} onClick={handleStatusFilter} />
                <FilterButton title='Active' value={StatusFilterConstants.ACTIVE} onClick={handleStatusFilter} />
                <FilterButton title='Completed' value={StatusFilterConstants.COMPLETED} onClick={handleStatusFilter} />
            </div>
            <div className={styles.delete_container}>
                <button disabled={!todos.filter(todo => todo.status).length} onClick={clearCompletedTodos} className={styles.delete_button} type='button'>Delete completed</button>
            </div>
        </>
    );
};
