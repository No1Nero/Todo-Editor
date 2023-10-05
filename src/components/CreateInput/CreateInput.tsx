import styles from './CreateInput.module.css';
import { BsPlusLg } from 'react-icons/bs';
import { ITodo } from "../../models/ITodo";
import { Dispatch, SetStateAction } from 'react';
import { formatInputText } from '../../utils/formatInputText';
import uuid from 'react-uuid';
import { addOneDay } from '../../utils/timeUtils';

interface CreateInputProps {
    createInputText: string,
    onAddTodo: (todo: ITodo) => void,
    onSetCreateInputText: Dispatch<SetStateAction<string>>,
    onHandleModal: () => void,
};

export default function CreateInput({createInputText, onAddTodo, onSetCreateInputText, onHandleModal}: CreateInputProps) {
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
