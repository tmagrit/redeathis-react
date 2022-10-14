import React from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ClearIcon from '@mui/icons-material/Clear';

const FilterComponent = ( props ) => {

    const { filterText, onFilter, onClear } = props;

    return (
        <FormControl variant="outlined" >
            {/* <InputLabel shrink htmlFor="search">Buscar</InputLabel> */}
            <OutlinedInput
                id="search"
                type="text"
                size="small"
                margin="dense"
                placeholder="buscar"
                sx={{ paddingRight: 0, color: 'text.secondary', }}
                value={filterText}
                onChange={onFilter}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="clear search field"
                            onClick={onClear}
                        >
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
    
};

export default FilterComponent;