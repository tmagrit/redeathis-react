import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteClass, addTag, updateClassName, updateTagsNames, updateClass, updateClassTags } from '../features/researchSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LabelOffIcon from '@mui/icons-material/LabelOff'; 
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'; 
import LabelIcon from '@mui/icons-material/Label';


const TagsEdit = ( props ) => {

    const { classId, cleanTypes } = props;

    // REDUX STATES
    const dispatch = useDispatch();
    const classObj = useSelector(state => state.research.classes).find(c => c.id === classId);  // console.log('classObj',classObj);
    const tags = useSelector(state => state.research.tags);

    const dummyClassObj = { category_id: null, name: '', };
    const dummyTagObj = { class_id: classId, name: '', };

    const [newTagData, setNewTagData] = useState({...dummyTagObj});
    const [classObjData, setClassObjData] = useState({...classObj});  console.log('classObjData',classObjData);
    const [tagsArrayData, setTagsArrayData] = useState([...tags]); //console.log('tagsArrayData',tagsArrayData);

    // HANDLE EDIT CLASSES AND TAGS ???    
    const handleSaveClass = () => {
        dispatch(updateClass(classId));
        dispatch(updateClassTags(classId));
    };

    // HANDLE ADD TAG
    const handleAddTag = () => {
        const updatedClass = {
            class_id: classId,
            name: newTagData.name
        }
        dispatch(addTag(updatedClass));
        setNewTagData(dummyTagObj);
    };

    // CHANGE CLASS OBJECT STATE
    const handleChangeClassObj = (event) => {
        let newClass = {...classObjData, [event.target.name]: event.target.value}
        setClassObjData(newClass);
        dispatch(updateClassName(newClass));
    };

    // CHANGE TAGS OBJECTS STATE
    const handleChangeTagsArray = (event) => { //console.log('handleChangeTagsArray-event.target',event.target); console.log('handleChangeTagsArray-event.target.id',event.target.id); console.log('handleChangeTagsArray-event.target.name',event.target.name);
        const newTags = tagsArrayData.map(tam => {
            if( tam.id === parseInt(event.target.id) ) {
                let newTag = {...tam, [event.target.name]: event.target.value}; 
                dispatch(updateTagsNames(newTag));

                return newTag;
            }
            else
                return tam;
        });
        
        setTagsArrayData([...newTags]); //console.log('handleChangeTagsArray-newTags',newTags);
    };    

    // HANDLE DELETE CLASS
    const handleDeleteClass = (classobj) => {
        dispatch(deleteClass(classobj));
        setClassObjData({...dummyClassObj});
    }

    // VALIDATE FIELDS
    const validateName = (str) => {
        if(str.length > 2)
        return true
        else
        return false
    }

    // RE-RENDER COMPONENT ON TAG ARRAY CHANGES
    useEffect(() => {
        setTagsArrayData([...tags]);
    }, [tags])


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
                        value={classObjData && classObjData.name}
                        //error={emailError(email)}
                        onChange={(event) => handleChangeClassObj(event)}
                        variant="standard"
                        fullWidth
                        id="class"
                        name="name"
                        type="text"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><BookmarkIcon /></InputAdornment>,
                            endAdornment: <InputAdornment position="end"><IconButton disabled={(tags.length > 0)} onClick={() => { handleDeleteClass(classObj); cleanTypes(); }} ><BookmarkRemoveIcon color={(tags.length > 0) ? 'inherit' : 'error'}/></IconButton></InputAdornment>,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                    />
                    <Stack spacing={1} >
                        {tagsArrayData && tagsArrayData.filter(t => t.class_id === classId).map(ct => (
                            <TextField
                                value={ct.name}
                                //error={emailError(email)}
                                onChange={(event) => handleChangeTagsArray(event)}
                                variant="standard"
                                fullWidth
                                id={ct.id}
                                name="name"
                                type="text"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LabelIcon /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end"><IconButton><LabelOffIcon color="error"/></IconButton></InputAdornment>,
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
                            value={newTagData.name}
                            //error={emailError(email)}
                            onChange={e => setNewTagData({...newTagData, [e.target.name]: e.target.value})}
                            fullWidth
                            label="Nome do Marcador"
                            id="newtagname"
                            name="name"
                            size="small"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                        />
                        <Button 
                            variant="outlined" 
                            disabled={!validateName(newTagData.name) || newTagData.name.length === 0}
                            fullWidth 
                            endIcon={<LabelIcon />}
                            onClick={e => {
                                e.preventDefault();
                                handleAddTag();
                            }}
                            sx={{ mt: 1, }}
                        >
                            Incluir novo Marcador
                        </Button>
                    </Box>  

                    <Button 
                        variant="contained" 
                        //disabled={!validateName(classObjState.name) || classObjState.name.length === 0}
                        fullWidth 
                        endIcon={<BookmarkAddedIcon />}
                        onClick={e => {
                            e.preventDefault();
                            handleSaveClass();
                        }}
                        sx={{ mt: 1, }}
                    >
                        Salvar
                    </Button>
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
