import { useContext } from 'react';
import './Header.scss';
import { ThemeContext } from '../../context/themeContext';
import ReactSwitch from 'react-switch';

export default function Header() {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <header className='header'>
            <h1>Todo Editor</h1>
            <div className='header_theme_toggler'>
                <label className='header_theme_label'>{theme === 'light' ? 'Light' : 'Dark'} mode</label>
                <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} />
            </div>
        </header>
    );
};
