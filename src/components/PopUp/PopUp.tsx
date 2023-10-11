import './PopUp.scss';

interface PopUpProps {
    onHandlePopUp: () => void,
    onClearCompletedTodos: () => void,
};

export default function PopUp({onHandlePopUp, onClearCompletedTodos}: PopUpProps) {

    const popUpConfirmed = () => {
        onClearCompletedTodos();
        onHandlePopUp();
    };

    return (
        <div className='popup_content'>
            <p className='popup_title'>Do you really want to delete all completed todos?</p>
            <div className='popup_button_container'>
                <button className='popup_cancel_button' onClick={onHandlePopUp}>No</button>
                <button className='popup_save_button' onClick={popUpConfirmed}>Yes</button>
            </div>
        </div>
    );
};
