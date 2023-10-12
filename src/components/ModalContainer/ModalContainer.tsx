import './ModalContainer.scss';

interface ModalContainerProps {
    children: React.ReactNode,
    onHandleModal: () => void,
};

export default function ModalContainer({children, onHandleModal}: ModalContainerProps) {
    return (
        <div className='modal_container_window'>
            <div onClick={onHandleModal} className='modal_container_blur'></div>
            {children}
        </div>
    );
};
