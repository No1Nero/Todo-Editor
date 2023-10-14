import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/todoTypes';
import { StatusFilterConstants } from '../../constants/statusFilterConstants';
import FilterButton from '../FilterButton/FilterButton';
import './FilterMenu.scss';

export default function FilterMenu() {
    const dispatch = useDispatch();

    const handleStatusFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({type: TodoActionTypes.CHANGE_FILTER, payload: e.currentTarget.value});
    };

    return (
        <div className='filter_container'>
            <FilterButton title='All' value={StatusFilterConstants.ALL} onClick={handleStatusFilter} />
            <FilterButton title='Active' value={StatusFilterConstants.ACTIVE} onClick={handleStatusFilter} />
            <FilterButton title='Completed' value={StatusFilterConstants.COMPLETED} onClick={handleStatusFilter} />
        </div>
    );
};
