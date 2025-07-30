import * as React from 'react';
import { useState } from 'react';
import { setResearchSearchInput } from '../features/researchSlice'; 
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField'; 
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';

const SearchBar = ( ) => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    // const researchSearchInput = useSelector(state => state.research.researchSearchInput);   
    
    // REACT STATES
    const [value, setValue] = useState('');

    // HANDLE RESEARCH INPUT
    const handleResearchSearchInput = (e) => {
        const searchInput = e.target.value;
        dispatch(setResearchSearchInput(searchInput));
        setValue(searchInput);
    }; 

    return (
        <TextField
            value={value}
            onChange={handleResearchSearchInput}
            id="buscar-em-acervo"
            label="Buscar item em acervo"
            sx={{ color: 'inherit', }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="limpar-busca-em-acervo"
                            onClick={() => {setValue(''); dispatch(setResearchSearchInput(''));}} 
                            edge="end"
                        >
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            variant="outlined"
            fullWidth
            size="small"
        />
    );

};

export default SearchBar;

SearchBar.defaultProps = {
    value: '',
}

SearchBar.propTypes = {
    value: PropTypes.string,
};









