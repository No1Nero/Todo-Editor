import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Modal.module.css';
import { ITodo } from '../../models/ITodo';
import { formatDateFromISO } from '../../utils/formatDateFromISO';
import { formatInputText } from '../../utils/formatInputText';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/types';
import { validateSaveButton } from '../../utils/validateSaveButton';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

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
    const [expires, setExpires] = useState<Date | null>(null);
    const maxInputLength = 70;
    const dispatch = useDispatch();

    useEffect(() => {
        if (item) {
            setEditTitle(item.title);
            setCreated(new Date(item.creationDate).toISOString());
            setExpires(new Date(item.expirationDate));
        } else {
            setCreated(new Date().toISOString());
        }
    }, [item]);

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
            const {id, status, creationDate} = item;
            const editedTodo = {
                id: id,
                title: editTitle,
                status: status,
                creationDate: new Date(creationDate).toISOString(),
                expirationDate: new Date(expires!).toISOString(),
            };
            dispatch({type: TodoActionTypes.EDIT_TODO, payload: editedTodo});
        } else {
            const createdTodo = {
                id: uuid(),
                title: createInputText!,
                status: false,
                creationDate: new Date (created).toISOString(),
                expirationDate: new Date(expires!).toISOString(),
            };
            onAddTodo!(createdTodo);
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
                        <input value={item ? editTitle : createInputText} maxLength={maxInputLength} onChange={handleInputText} className={styles.input_field} type='text' />
                    </div>
                    <div className={styles.singe_input}>
                        <p className={styles.input_name}>Created</p>
                        <input value={formatDateFromISO(created)} readOnly className={styles.input_field} type="text" />
                    </div>
                    <div className={styles.singe_input}>
                        <p className={styles.input_name_req}>Expires</p>
                        <DateTimePicker value={expires} onChange={setExpires} minDate={new Date()} format='dd.MM.y HH:mm' required className={styles.input_field_expires} />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <button className={styles.cancel_button} type='button' onClick={closeModal}>Cancel</button>
                    <button onClick={saveTodo} className={styles.save_button} type='button' disabled={item ? validateSaveButton(expires, editTitle) : validateSaveButton(expires, createInputText!)}>Save</button>
                </div>
            </div>
        </div>
    );
};
