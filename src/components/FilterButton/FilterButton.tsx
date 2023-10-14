import classNames from "classnames";
import { useTypedSelector } from "../../store/useTypedSelector";
import { todoCounter } from "../../utils/todoCounter";
import './FilterButton.scss';

interface FilterButtonProps {
    title: string,
    value: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
};

export default function FilterButton({title, value, onClick}: FilterButtonProps) {
    const {statusFilter, todos} = useTypedSelector(state => state.todo);
    const countedTodos = todoCounter(todos, value);

    return (
        <button 
            className={statusFilter === value ? classNames('filter_button', 'filter_button_chosen_filter') : 'filter_button'} 
            type="button" 
            onClick={onClick} 
            value={value}>
                {title} 
                <label className="counter_label">{countedTodos && countedTodos}</label>
        </button>
    );
};
