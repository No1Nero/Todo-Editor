import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Modal.module.css';
import { ITodo } from '../../models/ITodo';
import { formatDate } from '../../utils/formatDate';
import uuid from 'react-uuid';

interface ModalProps {
    createInputText: string,
    onHandleInputText: (e: React.FormEvent<HTMLInputElement>) => void,
    onAddTodo: (todo: ITodo) => void,
    onSetIsShownModal: Dispatch<SetStateAction<boolean>>,
    onSetCreateInputText: Dispatch<SetStateAction<string>>
};

export default function Modal({createInputText, onHandleInputText, onAddTodo, onSetIsShownModal, onSetCreateInputText}: ModalProps) {
    const [created] = useState<string>(formatDate(new Date()));
    const [expires, setExpires] = useState<string>('');
    const todayMinDate = new Date().toISOString().slice(0, 16);

    const handleExpires = (e: React.FormEvent<HTMLInputElement>) => {
        const expDate = new Date(e.currentTarget.value);
        const curDate = new Date();
        if (expDate < curDate) {
            setExpires('');
        } else {
            setExpires(e.currentTarget.value);
        }
    };

    const closeModal = () => {
        onSetIsShownModal(setIsShownModal => !setIsShownModal);
        onSetCreateInputText('');
    };

    const publicTodo = () => {
        const obj = {
            id: uuid(),
            title: createInputText,
            status: false,
            creationDate: created,
            expirationDate: formatDate(new Date(expires)),
        };
        onAddTodo(obj);
        closeModal();
    };

    return (
        <div className={styles.modal_window}>
            <div onClick={closeModal} className={styles.modal_blur}></div>
            <div className={styles.modal_content}>
                <div className={styles.modal_title_container}>
                    <h2 className={styles.modal_title}>Create Todo</h2>
                </div>
                <div className={styles.modal_inputs}>
                    <div className={styles.singe_input}>
                        <p className={styles.input_name_req}>Title</p>
                        <input value={createInputText} onChange={onHandleInputText} className={styles.input_field} type='text' />
                    </div>
                    <div className={styles.singe_input}>
                        <p className={styles.input_name}>Created</p>
                        <input value={created} readOnly className={styles.input_field} type="text" />
                    </div>
                    <div className={styles.singe_input}>
                        <p className={styles.input_name_req}>Expires</p>
                        <input value={expires} min={todayMinDate} onChange={handleExpires} className={styles.input_field} type='datetime-local' />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <button className={styles.cancel_button} type='button' onClick={closeModal}>Cancel</button>
                    <button onClick={publicTodo} className={styles.save_button} type='button' disabled={!expires || !createInputText.trim()}>Save</button>
                </div>
            </div>
        </div>
    );
};
