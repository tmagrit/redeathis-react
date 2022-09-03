import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClass } from '../features/researchSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'; 



const ClassesEdit = ( props ) => {

    const { categoryId, cleanTypes } = props;

    // REDUX STATES
    const dispatch = useDispatch();
    const category = useSelector(state => state.research.categories).find(c => c.id === categoryId);  
    const classes = useSelector(state => state.research.classes); 
    const tags = useSelector(state => state.research.tags);  

    const [newClassName, setNewClassName] = useState('');
    const [classesArrayData, setClassesArrayData] = useState([...classes]); //console.log('tagsArrayData',tagsArrayData);

        
    const handleAddClass = () => {
        const newClass = {
            category_id: categoryId,
            name: newClassName
        }
        dispatch(addClass(newClass));
    }

    // VALIDATE FIELDS
    const validateName = (str) => {
        if(str.length > 2)
        return true
        else
        return false
    };

    // RE-RENDER COMPONENT ON CLASSES ARRAY CHANGES
    useEffect(() => {
        setClassesArrayData([...classes]);
    }, [classes])

    if(categoryId) {
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
                        {classesArrayData && classesArrayData.filter(c => c.category_id === categoryId).map(cc => ( 
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
                                        secondary={`Marcadores [${tags.filter(t => t.class_id === cc.id).length}]`}
                                        //secondary={cc.description ? cc.description : null}
                                    />
                                </ListItem>
                            )
                        )}
                    </List>


                    <TextField
                        value={newClassName}
                        //error={emailError(email)}
                        onChange={e => setNewClassName(e.target.value)}
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
                    <Button 
                        variant="contained" 
                        disabled={!validateName(newClassName) || newClassName.length === 0}
                        fullWidth 
                        endIcon={<BookmarkAddIcon />}
                        onClick={e => {
                            e.preventDefault();
                            handleAddClass();
                        }}
                    >
                        Incluir nova Classe
                    </Button>
                </Box>
            </React.Fragment>
        );
    } else {
        return null;
    };
}

export default ClassesEdit;

// ClassesEdit.defaultProps = {
//     categoryId: 1,
// };

ClassesEdit.propTypes = {
    categoryId: PropTypes.number.isRequired,
};