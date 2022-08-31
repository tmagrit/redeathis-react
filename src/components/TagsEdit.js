import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClass } from '../features/researchSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import BookmarksIcon from '@mui/icons-material/Bookmarks';


import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import LabelIcon from '@mui/icons-material/Label';


const TagsEdit = ( props ) => {

    const { classId } = props;

    // REDUX STATES
    const dispatch = useDispatch();
    const classObj = useSelector(state => state.research.classes).find(c => c.id === classId);   
    const tags = useSelector(state => state.research.tags).filter(t => t.class_id === classId);

    const [className, setClassName] = useState('');
    const [classDescription, setClassDescription] = useState('');

        
    const handleEditClass = () => {
        // const newClass = {
        //     category_id: classId,
        //     name: className,
        //     description: classDescription
        // }
        // dispatch(addClass(newClass));
        // setClassName('');
        // setClassDescription('');
    }

    // VALIDATE FIELDS
    const validateName = (str) => {
        if(str.length > 2)
        return true
        else
        return false
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    minWidth: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 3,
                }}
            >

                <Stack spacing={5} sx={{ width: '100%', maxWidth: 560, }}>
                    <TextField
                        value={classObj.name}
                        //error={emailError(email)}
                        //onChange={e => setClassName(e.target.value)}
                        variant="standard"
                        fullWidth
                        id="class"
                        type="text"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><BookmarkIcon /></InputAdornment>,
                            endAdornment: <InputAdornment position="end"><DeleteIcon /></InputAdornment>,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                    />
                    <Stack spacing={1} >
                        {tags && tags.map(ct => (
                            <TextField
                                value={ct.name}
                                //error={emailError(email)}
                                //onChange={e => setClassName(e.target.value)}
                                variant="standard"
                                fullWidth
                                id={ct.id}
                                type="text"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LabelIcon /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end"><DeleteIcon /></InputAdornment>,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                            /> 
                            )
                        )}
                    </Stack>  
                    <Box >
                        <TextField
                            value={className}
                            //error={emailError(email)}
                            onChange={e => setClassName(e.target.value)}
                            fullWidth
                            label="Nome da Classe"
                            id="classname"
                            size="small"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                        />
                        <Button 
                            variant="contained" 
                            disabled={!validateName(className) || className.length === 0}
                            fullWidth 
                            endIcon={<LabelIcon />}
                            onClick={e => {
                                e.preventDefault();
                                handleEditClass();
                            }}
                            sx={{ mt: 1, }}
                        >
                            Incluir novo Marcador
                        </Button>
                    </Box>  
                </Stack>
            </Box>
        </React.Fragment>
    );
}

export default TagsEdit;

TagsEdit.defaultProps = {
    classId: 1,
}

TagsEdit.propTypes = {
    classId: PropTypes.number.isRequired,
};
