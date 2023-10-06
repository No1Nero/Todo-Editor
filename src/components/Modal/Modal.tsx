import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Modal.module.css';
import { ITodo } from '../../models/ITodo';
import { formatDateFromISO } from '../../utils/formatDateFromISO';
import { formatInputText } from '../../utils/formatInputText';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/todoTypes';
import { validateSaveButton } from '../../utils/validateSaveButton';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getMaxDate, getMinDate } from '../../utils/timeFormats';
import { useTypedSelector } from '../../store/useTypedSelector';
import { StatusFilterConstants } from '../../constants/statusFilterConstants';

interface ModalProps {
    createInputText?: string,
    onAddTodo?: (todo: ITodo) => void,
    onSetCreateInputText?: Dispatch<SetStateAction<string>>,
    item?: ITodo,
    onHandleModal: () => void,
    filteredTodos?: ITodo[],
};

export default function Modal({createInputText, onAddTodo, onSetCreateInputText, item, onHandleModal, filteredTodos}: ModalProps) {
    const [editTitle, setEditTitle] = useState<string>('');
    const [created, setCreated] = useState<string>('');
    const [expires, setExpires] = useState<Date | null>(null);
    const {statusFilter} = useTypedSelector(state => state.todo);
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
            if (statusFilter === StatusFilterConstants.COMPLETED && !filteredTodos?.length) {
                dispatch({type: TodoActionTypes.CHANGE_FILTER, payload: StatusFilterConstants.ALL});
            }
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
                        <DatePicker 
                            selected={expires} 
                            onChange={(date) => setExpires(date)} 
                            dateFormat='dd.MM.yyyy HH:mm' 
                            minDate={new Date()} 
                            showTimeSelect 
                            timeFormat='HH:mm' 
                            timeIntervals={5} 
                            minTime={getMinDate(expires)} 
                            maxTime={getMaxDate(new Date())}
                        />
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
