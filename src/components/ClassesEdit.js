import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClass } from '../features/researchSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'; 
import EditIcon from '@mui/icons-material/Edit'; 


const ClassesEdit = ( props ) => {

    const { categoryId } = props;

    // REDUX STATES
    const dispatch = useDispatch();
    const category = useSelector(state => state.research.categories).find(c => c.id === categoryId);   

    const [className, setClassName] = useState('');
    const [classDescription, setClassDescription] = useState('');

        
    const handleSignin = () => {
        const newClass = {
            category_id: categoryId,
            name: className,
            description: classDescription
        }
        dispatch(addClass(newClass));
        setClassName('');
        setClassDescription('');
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

                <List sx={{ width: '100%', maxWidth: 360, }}>
                    {category.classes && category.classes.map(cc => (
                            <ListItem
                                disablePadding
                                alignItems="flex-start"
                                // secondaryAction={
                                //     <IconButton edge="end" aria-label="delete">
                                //         <EditIcon />
                                //     </IconButton>
                                // }
                            >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: `${category.color}` }} >
                                    <BookmarkIcon />
                                </Avatar>
                            </ListItemAvatar>
                                <ListItemText
                                    primary={cc.name}
                                    secondary={cc.description ? cc.description : null}
                                />
                            </ListItem>
                        )
                    )}
                </List>





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
                    sx={{ mt: 3, mb: 1,}}
                />
                <TextField
                    value={classDescription}
                    //error={emailError(email)}
                    onChange={e => setClassDescription(e.target.value)}
                    fullWidth
                    label="Descrição"
                    id="classdescription"
                    size="small"
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                    sx={{ mb: 2,}}
                />
                <Button 
                    variant="contained" 
                    disabled={!validateName(className) || className.length === 0}
                    fullWidth 
                    endIcon={<BookmarkAddIcon />}
                    onClick={e => {
                        e.preventDefault();
                        handleSignin();
                    }}
                >
                    Adicionar Nova Classe
                </Button>
            </Box>
        </React.Fragment>
    );
}

export default ClassesEdit;

ClassesEdit.defaultProps = {
    categoryId: 1,
}

ClassesEdit.propTypes = {
    categoryId: PropTypes.number.isRequired,
  };
