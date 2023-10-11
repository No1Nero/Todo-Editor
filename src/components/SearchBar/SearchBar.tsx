import React, { Dispatch, SetStateAction } from "react";
import { formatInputText } from "../../utils/formatInputText";
import './SearchBar.scss';
import CustomInput from "../CustomInput/CustomInput";

interface SearchBarProps {
    searchText: string,
    onSetSearchText: Dispatch<SetStateAction<string>>
};

export default function SearchBar({searchText, onSetSearchText}: SearchBarProps) {

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        onSetSearchText(formatInputText(e.currentTarget.value));
    };

    return (
        <div>
            <h2 className='search_bar_search_title'>Search Todos</h2>
            <CustomInput value={searchText} placeholder="Enter to search todos" onChange={handleInputChange} />
        </div>
    );
};
