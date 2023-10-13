import { maxInputLength } from "../../constants/inputConstants";
import './CustomInput.scss';

interface CustomInputProps {
    value: string,
    placeholder: string,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
};
export default function CustomInput({value, placeholder, onChange}: CustomInputProps) {
    return (
        <input 
            type="text" 
            maxLength={maxInputLength}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="custom_input"
        />
    );
};
