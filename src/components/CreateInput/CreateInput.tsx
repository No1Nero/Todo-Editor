import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { ITodo } from "../../models/ITodo";
import { formatInputText } from '../../utils/formatInputText';
import { addOneDay } from '../../utils/timeUtils';
import { useTypedSelector } from '../../store/useTypedSelector';
import { StatusFilterConstants } from '../../constants/statusFilterConstants';
import { TodoActionTypes } from '../../store/todoTypes';
import CustomInput from '../CustomInput/CustomInput';
import { BsPlusLg } from 'react-icons/bs';
import './CreateInput.scss';

interface CreateInputProps {
    createInputText: string,
    onAddTodo: (todo: ITodo) => void,
    onSetCreateInputText: Dispatch<SetStateAction<string>>,
    onHandleModal: () => void,
    filteredTodos: ITodo[],
};

export default function CreateInput({createInputText, onAddTodo, onSetCreateInputText, onHandleModal, filteredTodos}: CreateInputProps) {
    const {statusFilter} = useTypedSelector(state => state.todo);
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (createInputText.trim()) {
            const obj = {
                id: uuid(),
                title: createInputText,
                status: false,
                creationDate: new Date().toISOString(),
                expirationDate: addOneDay(new Date()).toISOString(),
            };
            onAddTodo(obj);
            if (statusFilter === StatusFilterConstants.COMPLETED && !filteredTodos.length) {
                dispatch({type: TodoActionTypes.CHANGE_FILTER, payload: StatusFilterConstants.ALL});
            }
        }
    };

    const handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        onSetCreateInputText(formatInputText(e.currentTarget.value));
    };

    return (
        <form className='create_input_form' onSubmit={handleSubmit}>
            <h2 className='create_input_title'>Create Todo</h2>
            <div className='create_input_input_wrapper'>
                <CustomInput value={createInputText} placeholder='Enter title to create' onChange={handleInputText} />
                <button onClick={onHandleModal} type="button" className='create_input_button'><BsPlusLg className='add_todo_icon' size={40}/></button>
            </div>
        </form>
    );
};
