import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './Modal.scss';
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
import { maxExpirationDate, maxInputLength } from '../../constants/inputConstants';
import { fiveMins } from '../../constants/timeConstants';

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
        <div className='modal_content'>
            <div className='modal_title_container'>
                <h2 className='modal_title'>{item ? 'Edit' : 'Create'} Todo</h2>
            </div>
            <div className='modal_inputs'>
                <div className='modal_singe_input'>
                    <p className='modal_input_name_req'>Title</p>
                    <input value={item ? editTitle : createInputText} maxLength={maxInputLength} onChange={handleInputText} className='modal_input_field' type='text' />
                </div>
                <div className='modal_singe_input'>
                    <p className='modal_input_name'>Created</p>
                    <input value={formatDateFromISO(created)} readOnly className='modal_input_field' type="text" />
                </div>
                <div className='modal_singe_input'>
                    <p className='modal_input_name_req'>Expires</p>
                    <DatePicker 
                        selected={expires} 
                        onChange={(date) => setExpires(date)} 
                        dateFormat='dd.MM.yyyy HH:mm' 
                        minDate={new Date()} 
                        maxDate={maxExpirationDate}
                        showTimeSelect 
                        timeFormat='HH:mm' 
                        timeIntervals={fiveMins} 
                        minTime={getMinDate(expires)} 
                        maxTime={getMaxDate(new Date())}
                        className='modal_input_field'
                    />
                </div>
            </div>
            <div className='modal_button_container'>
                <button className='modal_cancel_button' type='button' onClick={closeModal}>Cancel</button>
                <button onClick={saveTodo} className='modal_save_button' type='button' disabled={item ? validateSaveButton(expires, editTitle) : validateSaveButton(expires, createInputText!)}>Save</button>
            </div>
        </div>
    );
};
