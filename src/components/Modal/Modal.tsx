import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Modal.module.css';
import { ITodo } from '../../models/ITodo';
import { formatDate } from '../../utils/formatDate';
import { formatISODate } from '../../utils/formatISODate';
import { formatInputText } from '../../utils/formatInputText';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/types';
import { formatDateForEditing } from '../../utils/formatDateForEditing';

interface ModalProps {
    createInputText?: string,
    onAddTodo?: (todo: ITodo) => void,
    onSetCreateInputText?: Dispatch<SetStateAction<string>>,
    item?: ITodo,
    onHandleModal: () => void,
};

export default function Modal({createInputText, onAddTodo, onSetCreateInputText, item, onHandleModal}: ModalProps) {
    const [editTitle, setEditTitle] = useState<string>('');
    const [created, setCreated] = useState<string>('');
    const [expires, setExpires] = useState<string>('');
    const todayISODate = formatISODate(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        if (item) {
            setEditTitle(item.title);
            setCreated(item.creationDate);
            setExpires(formatDateForEditing(item.expirationDate));
        } else {
            setCreated(formatDate(new Date()));
        }
    }, [item]);

    const handleExpires = (e: React.FormEvent<HTMLInputElement>) => {
        const expDate = new Date(e.currentTarget.value);
        const curDate = new Date();
        if (expDate < curDate) {
            setExpires('');
        } else {
            setExpires(e.currentTarget.value);
        }
    };

    const handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        const formattedInput = formatInputText(e.currentTarget.value);
        if (item) {
            setEditTitle(formattedInput);
        } else {
            onSetCreateInputText!(formattedInput);
        }
    };

    const closeModal = () => {
        onHandleModal();
        if (!item) {
            onSetCreateInputText!('');
        }
    };

    const saveTodo = () => {
        if (item) {
            const editObj = {
                id: item.id,
                title: editTitle,
                status: item.status,
                creationDate: item.creationDate,
                expirationDate: formatDate(new Date(expires)),
            };
            dispatch({type: TodoActionTypes.EDIT_TODO, payload: editObj});
        } else {
            const newObj = {
                id: uuid(),
                title: createInputText!,
                status: false,
                creationDate: created,
                expirationDate: formatDate(new Date(expires)),
            };
            onAddTodo!(newObj);
        }
        closeModal();
    };

    return (
        <div className={styles.modal_window}>
            <div onClick={closeModal} className={styles.modal_blur}></div>
            <div className={styles.modal_content}>
                <div className={styles.modal_title_container}>
                    <h2 className={styles.modal_title}>{item ? 'Edit' : 'Create'} Todo</h2>
                </div>
                <div className={styles.modal_inputs}>
                    <div className={styles.singe_input}>
                        <p className={styles.input_name_req}>Title</p>
                        <input value={item ? editTitle : createInputText} onChange={handleInputText} className={styles.input_field} type='text' />
                    </div>
                    <div className={styles.singe_input}>
                        <p className={styles.input_name}>Created</p>
                        <input value={created} readOnly className={styles.input_field} type="text" />
                    </div>
                    <div className={styles.singe_input}>
                        <p className={styles.input_name_req}>Expires</p>
                        <input value={expires} min={todayISODate} onChange={handleExpires} className={styles.input_field} type='datetime-local' />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <button className={styles.cancel_button} type='button' onClick={closeModal}>Cancel</button>
                    <button onClick={saveTodo} className={styles.save_button} type='button' disabled={item ? !editTitle.trim() || !expires : !expires || !createInputText!.trim()}>Save</button>
                </div>
            </div>
        </div>
    );
};
