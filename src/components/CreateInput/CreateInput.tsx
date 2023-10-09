import styles from './CreateInput.module.css';
import { BsPlusLg } from 'react-icons/bs';
import { ITodo } from "../../models/ITodo";
import { Dispatch, SetStateAction } from 'react';
import { formatInputText } from '../../utils/formatInputText';
import uuid from 'react-uuid';
import { addOneDay } from '../../utils/timeUtils';
import { useTypedSelector } from '../../store/useTypedSelector';
import { StatusFilterConstants } from '../../constants/statusFilterConstants';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/todoTypes';

interface CreateInputProps {
    createInputText: string,
    onAddTodo: (todo: ITodo) => void,
    onSetCreateInputText: Dispatch<SetStateAction<string>>,
    onHandleModal: () => void,
    filteredTodos: ITodo[],
};

export default function CreateInput({createInputText, onAddTodo, onSetCreateInputText, onHandleModal, filteredTodos}: CreateInputProps) {
    const {statusFilter} = useTypedSelector(state => state.todo);
    const dispatch = useDispatch();
    const maxInputLength = 70;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (createInputText.trim()) {
            const obj = {
                id: uuid(),
                title: createInputText,
                status: false,
                creationDate: new Date().toISOString(),
                expirationDate: addOneDay(new Date()).toISOString(),
            };
            onAddTodo(obj);
            if (statusFilter === StatusFilterConstants.COMPLETED && !filteredTodos.length) {
                dispatch({type: TodoActionTypes.CHANGE_FILTER, payload: StatusFilterConstants.ALL});
            }
        }
    };

    const handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        onSetCreateInputText(formatInputText(e.currentTarget.value));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Create Todo</h2>
            <div className={styles.input_wrapper}>
                <input type="text" className={styles.input} value={createInputText} maxLength={maxInputLength} onChange={handleInputText} placeholder="Enter title to create" />
                <button onClick={onHandleModal} type="button" className={styles.button}><BsPlusLg size={40}/></button>
            </div>
        </form>
    );
};
