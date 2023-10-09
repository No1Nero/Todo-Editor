import classNames from "classnames";
import { useTypedSelector } from "../../store/useTypedSelector";
import styles from './FilterButton.module.css';

interface FilterButtonProps {
    title: string,
    value: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
};

export default function FilterButton({title, value, onClick}: FilterButtonProps) {
    const {statusFilter} = useTypedSelector(state => state.todo);
    return (
        <button className={statusFilter === value ? classNames(styles.filter_button, styles.chosen_filter) : styles.filter_button} type="button" onClick={onClick} value={value}>{title}</button>
    );
};
