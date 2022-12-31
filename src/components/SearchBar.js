import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';

// STYLES
import { Search, SearchIconWrapper, StyledInputBase } from '../styles/searchBarStyles';

const SearchBar = () => {

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Buscar acervo…"
                inputProps={{ 'aria-label': 'buscar acervo' }}
            />
        </Search>
    );

};

export default SearchBar;