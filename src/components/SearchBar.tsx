import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
    const [placeholder, setPlaceholder] = useState<string>('Search user..');

    const handleFocus = () => {
        setPlaceholder('');
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            setPlaceholder('Search user.. ');
        }
    };

    return (
        <TextField
            placeholder={placeholder}
            value={''}
            onChange={onChange}
            fullWidth
            margin="normal"
            onFocus={handleFocus}
            onBlur={handleBlur}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;
