import React, { Dispatch, SetStateAction } from "react";
import { formatInputText } from "../../utils/formatInputText";
import styles from './SearchBar.module.css';

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
            <h2 className={styles.search_title}>Search Todos</h2>
            <input className={styles.search_input} type="text" value={searchText} onChange={handleInputChange} placeholder="Enter to search todos" />
        </div>
    );
};
