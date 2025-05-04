// src/Components/Dashboard/LeftPanel/ThemeToggleButton.jsx
const ThemeToggleButton = ({ theme, toggleTheme, position = 'left' }) => {
    return (
        <button
            onClick={toggleTheme}
            style={{
                alignSelf: position === 'right' ? 'flex-end' : 'flex-start',
                padding: '0.5rem 1rem',
                backgroundColor: theme === 'light' ? '#333' : '#eee',
                color: theme === 'light' ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
            }}
        >
            {theme === 'light' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
        </button>
    );
};

export default ThemeToggleButton;
