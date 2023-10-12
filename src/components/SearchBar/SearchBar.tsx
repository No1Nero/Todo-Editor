import React, { Dispatch, SetStateAction } from "react";
import { formatInputText } from "../../utils/formatInputText";
import './SearchBar.scss';

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
            <input className='search_bar_search_input' type="text" value={searchText} onChange={handleInputChange} placeholder="Enter to search todos" />
        </div>
    );
};
