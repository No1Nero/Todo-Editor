import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    onSetIsShownModal: Dispatch<SetStateAction<boolean>>,
    createInputText: string,
    onHandleInputText: any,
    onAddTodo: any,
    onFormatDate: any,
    onSetCreateInputText: Dispatch<SetStateAction<string>>
};

export default function Modal({onSetIsShownModal, createInputText, onHandleInputText, onAddTodo, onFormatDate, onSetCreateInputText}: ModalProps) {
    const [created] = useState<string>(onFormatDate(new Date()));
    const [expires, setExpires] = useState<string>('');

    const handleExpires = (e: React.FormEvent<HTMLInputElement>) => {
        const expDate = new Date(e.currentTarget.value);
        const curDate = new Date();
        if (expDate < curDate) {
            setExpires('');
        } else {
            setExpires(e.currentTarget.value);
        }
        
    };

    const publicTodo = () => {
        const obj = {
            id: Math.random().toString(36).substr(2, 9),
            title: createInputText,
            status: false,
            creationDate: created,
            expirationDate: onFormatDate(new Date(expires)),
        };
        onAddTodo(obj);
        onSetIsShownModal(isShownModal => !isShownModal);
    };

    const cancelModal = () => {
        onSetIsShownModal(isShownModal => !isShownModal);
        onSetCreateInputText('');
    };

    return (
        <div className={styles.modal_window}>
            <div onClick={()=> onSetIsShownModal(isShownModal => !isShownModal)} className={styles.modal_blur}></div>
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
                        <input value={expires} min={created} onChange={handleExpires} className={styles.input_field} type='datetime-local' />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <button className={styles.cancel_button} type='button' onClick={cancelModal}>Cancel</button>
                    <button onClick={publicTodo} className={styles.save_button} type='button' disabled={!expires || !createInputText.trim()}>Save</button>
                </div>
            </div>
        </div>
    );
};
