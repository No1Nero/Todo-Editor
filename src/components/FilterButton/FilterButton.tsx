import classNames from "classnames";
import { useTypedSelector } from "../../store/useTypedSelector";
import './FilterButton.scss';

interface FilterButtonProps {
    title: string,
    value: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
};

export default function FilterButton({title, value, onClick}: FilterButtonProps) {
    const {statusFilter} = useTypedSelector(state => state.todo);
    return (
        <button className={statusFilter === value ? classNames('filter_button_filter_button', 'filter_button_chosen_filter') : 'filter_button_filter_button'} type="button" onClick={onClick} value={value}>{title}</button>
    );
};
