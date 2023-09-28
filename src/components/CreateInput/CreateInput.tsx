import { Dispatch, SetStateAction } from "react";
import styles from './CreateInput.module.css';

interface CreateInputProps {
    createInputText: string,
    onSetCreateInputText: Dispatch<SetStateAction<string>>,
    onAddTodo: any,
};

export default function CreateInput({createInputText, onSetCreateInputText, onAddTodo}: CreateInputProps) {

    const handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        onSetCreateInputText(e.currentTarget.value);
      };

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
            <input className={styles.input} value={createInputText} onChange={handleInputText} placeholder="Enter title to create" />
        </form>
    );
};
