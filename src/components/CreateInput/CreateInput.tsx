import styles from './CreateInput.module.css';
import { BsPlusLg } from 'react-icons/bs';
import { ITodo } from "../../models/ITodo";
import { Dispatch, SetStateAction } from 'react';
import { formatDate } from '../../utils/formatDate';
import uuid from 'react-uuid';

interface CreateInputProps {
    createInputText: string,
    onHandleInputText: (e: React.FormEvent<HTMLInputElement>) => void,
    onAddTodo: (todo: ITodo) => void,
    onSetIsShownModal: Dispatch<SetStateAction<boolean>>,
};

export default function CreateInput({createInputText, onHandleInputText, onAddTodo, onSetIsShownModal}: CreateInputProps) {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (createInputText.trim()) {
            const tomorrowExpirationDate = Date.now() + 1000*60*60*24;
            const obj = {
                id: uuid(),
                title: createInputText,
                status: false,
                creationDate: formatDate(new Date()),
                expirationDate: formatDate(new Date(tomorrowExpirationDate)),
            };
            onAddTodo(obj);
        }
    };

    const openModal = () => {
        onSetIsShownModal(setIsShownModal => !setIsShownModal);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Create Todo</h2>
            <div className={styles.input_wrapper}>
                <input type="text" className={styles.input} value={createInputText} onChange={onHandleInputText} placeholder="Enter title to create" />
                <button onClick={openModal} type="button" className={styles.button}><BsPlusLg size={40}/></button>
            </div>
        </form>
    );
};
