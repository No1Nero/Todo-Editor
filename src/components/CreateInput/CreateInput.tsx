import { Dispatch, SetStateAction } from "react";
import styles from './CreateInput.module.css';
import {BsPlusLg} from 'react-icons/bs';

interface CreateInputProps {
    createInputText: string,
    onHandleInputText: any,
    onAddTodo: any,
    onSetIsShownModal: Dispatch<SetStateAction<boolean>>
};

export default function CreateInput({createInputText, onHandleInputText, onAddTodo, onSetIsShownModal}: CreateInputProps) {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const obj = {
            id: Math.random().toString(36).substr(2, 9),
            title: createInputText,
            status: false,
            creationDate: new Date().toLocaleString(),
            expirationDate: new Date(Date.now() + 1000*60*60*24).toLocaleString(),
        };
        onAddTodo(obj);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Create Todo</h2>
            <div className={styles.input_wrapper}>
                <input type="text" className={styles.input} value={createInputText} onChange={onHandleInputText} placeholder="Enter title to create" />
                <button onClick={()=> onSetIsShownModal(isShownModal => !isShownModal)} type="button" className={styles.button}><BsPlusLg size={40}/></button>
            </div>
        </form>
    );
};
