import React, { Dispatch, SetStateAction } from "react";
import { formatInputText } from "../../utils/formatInputText";
import './SearchBar.scss';
import CustomInput from "../CustomInput/CustomInput";
import { RxCross2 } from "react-icons/rx";

interface SearchBarProps {
    searchText: string,
    onSetSearchText: Dispatch<SetStateAction<string>>
};

export default function SearchBar({searchText, onSetSearchText}: SearchBarProps) {

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        onSetSearchText(formatInputText(e.currentTarget.value));
    };

    const clearInput = () => {
        onSetSearchText('');
    };

    return (
        <div>
            <h2 className='search_bar_search_title'>Search Todos</h2>
            <div className="custom_input_container">
                <CustomInput value={searchText} placeholder="Enter to search todos" onChange={handleInputChange} />
                <button className="clear_button" onClick={clearInput} type="button"><RxCross2 className="clear_button_icon" size={30} /></button>
            </div>
        </div>
    );
};
