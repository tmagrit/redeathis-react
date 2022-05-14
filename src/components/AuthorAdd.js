import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { createAuthor } from '../features/researchSlice';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';


const AuthorAdd = () => {

    // REDUX STATES
    const dispatch = useDispatch()

    // STATES
    const initialAuthor = { name: '', surname: '', link: null, birth: null, death: null }
    const [authorData, setAuthorData] = useState(initialAuthor);

    // CHANGE AUTHOR STATES
    const handleChangeAuthorData = (event) => {
        setAuthorData({...authorData, [event.target.id]: event.target.value});
    };

        
    const handleCreateAuthor = (authordata) => {
        dispatch(createAuthor(authordata));
        console.log('handleCreateAuthor', initialAuthor)
        setAuthorData(initialAuthor);
    };

    // VALIDATE FIELDS
    const validateString = (str) => {
        return str.replace(/\s/g,'');
    };
    const nameError = (str) => {
        if(validateString(str).length < 2 && str.length > 0)
        return true;
        else
        return false;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Box
                sx={{
                    minWidth: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item md={3} xs={12}>
                        <TextField
                            value={authorData.name}
                            error={nameError(authorData.name)}
                            onChange={e => handleChangeAuthorData(e)}
                            fullWidth
                            shrink
                            label="Nome"
                            id="name"
                            size="small"
                            type="text"
                            InputLabelProps={{ shrink: true }} 
                            //helperText={nameError(authorData.name) ? "Ao menos dois caracteres" : null}
                            //sx={{ mb: 2,}}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TextField
                            value={authorData.surname}
                            error={nameError(authorData.surname)}
                            onChange={e => handleChangeAuthorData(e)}
                            fullWidth
                            shrink
                            label="Sobrenome"
                            id="surname"
                            size="small"
                            type="text"
                            InputLabelProps={{ shrink: true }} 
                            //helperText={nameError(authorData.surname) ? "Ao menos dois caracteres" : null}
                            //sx={{ mb: 2,}}
                        /> 
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            value={authorData.link}
                            //error={nameError(authorData.surname)}
                            onChange={e => handleChangeAuthorData(e)}
                            fullWidth
                            shrink
                            label="Link"
                            id="link"
                            size="small"
                            type="text"
                            //helperText={nameError(authorData.surname) ? "Ao menos dois caracteres válidos" : null}
                            //sx={{ mb: 2,}}
                            InputLabelProps={{ shrink: true }} 
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <DesktopDatePicker
                            //maxDate={authorData.death}
                            label="Nascimento"
                            clearable
                            disabled={true}
                            inputFormat="dd/MM/yyyy"
                            value={authorData.birth}
                            onChange={value => handleChangeAuthorData({ ...authorData, birth:value })}
                            renderInput={(params) => <TextField size="small" id="birth" fullWidth InputLabelProps={{ shrink: true }} {...params} />}
                        />
                    </Grid> 
                    <Grid item md={3} xs={12}>   
                        <DesktopDatePicker
                            //minDate={authorData.birth}
                            label="Morte"
                            clearable
                            disabled={true}
                            inputFormat="dd/MM/yyyy"
                            value={authorData.death}
                            onChange={value => handleChangeAuthorData({ ...authorData, death:value })}
                            renderInput={(params) => <TextField size="small" id="death" fullWidth InputLabelProps={{ shrink: true }} {...params} />}
                            disableFuture
                        />
                    </Grid>    
                    <Grid item md={6} xs={12}>
                        <Button 
                            variant="contained" 
                            disabled={!validateString(authorData.name) || authorData.name.length === 0}
                            fullWidth 
                            onClick={e => {
                                e.preventDefault();
                                handleCreateAuthor(authorData);
                            }}
                        >
                            Cadastrar Autor
                        </Button> 
                    </Grid>   
                </Grid>
            </Box>
        </LocalizationProvider>
    );
}

export default AuthorAdd;