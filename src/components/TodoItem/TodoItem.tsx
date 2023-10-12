import { ITodo } from '../../models/ITodo';
import { useDispatch } from 'react-redux';
import { TodoActionTypes } from '../../store/todoTypes';
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import './TodoItem.scss';
import classNames from 'classnames';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { formatDateFromISO } from '../../utils/formatDateFromISO';
import ModalContainer from '../ModalContainer/ModalContainer';
import TodoExpiredMark from '../TodoExpiredMark/TodoExpiredMark';
import { isTodoexpired } from '../../utils/isTodoExpired';

interface TodoItemProps {
    item: ITodo,
};

export default function TodoItem({item}: TodoItemProps) {
    const [isShownModal, setIsShownModal] = useState<boolean>(false);
    const {title, creationDate, expirationDate, status, id} = item;
    const dispatch = useDispatch();

    const handleStatusChange = () => {
        dispatch({type: TodoActionTypes.CHANGE_STATUS, payload: id});
    };

    const deleteTodo = () => {
        dispatch({type: TodoActionTypes.DELETE_TODO, payload: id});
    };

    const handleModal = () => {
        setIsShownModal(isShownModal => !isShownModal);
    };

    return (
        <div className='todo_item_container'>
            {isTodoexpired(expirationDate) && <TodoExpiredMark />}
            {isShownModal && 
            <ModalContainer onHandleModal={handleModal}>
                <Modal onHandleModal={handleModal} item={item}/>
            </ModalContainer>
            }
            <div className='todo_item_content_wrapper'>
                <div className='todo_item_header_wrapper'>
                    <input className='todo_item_checkbox' type="checkbox" checked={status} onChange={handleStatusChange}/>
                    <h1 className={status ? classNames('todo_item_title', 'todo_item_checked_title') : 'todo_item_title'}>{title}</h1>
                </div>
                <div className='todo_item_date_container'>
                    <p className='todo_item_date'>Created: {formatDateFromISO(creationDate)}</p>
                    <p className='todo_item_date'>Expires: {formatDateFromISO(expirationDate)}</p>
                </div>
                <div className='todo_item_button_container'>
                    <button onClick={handleModal} disabled={status} className='todo_item_edit_button'><BsPencil className='edit_icon' size={35} /></button>
                    <button onClick={deleteTodo} className='todo_item_delete_button' type='button'><BsTrash className='delete_icon' size={35} /></button>
                </div>
            </div>
        </div>
    );
};
