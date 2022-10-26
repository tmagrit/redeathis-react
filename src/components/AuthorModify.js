import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAuthor } from '../features/researchSlice';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';


const AuthorModify = (props) => {

    const { row } = props;

    // REDUX STATES
    const dispatch = useDispatch()

    // STATES
    const [authorData, setAuthorData] = useState({...row});

    // CHANGE AUTHOR TEXT STATES
    const handleChangeAuthorData = (event) => {
        setAuthorData({...authorData, [event.target.id]: event.target.value});
    };
        
    // HANDLE EDIT AUTHOR
    const handleUpdateAuthor = () => {
        dispatch(updateAuthor(authorData));
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
                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
                <Grid item md={8} xs={12}>
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
                <Grid item md={4} xs={12}>
                    <Button 
                        variant="contained" 
                        disabled={!validateString(authorData.name) || authorData.name.length === 0}
                        fullWidth 
                        onClick={handleUpdateAuthor}
                    >
                        Atualizar
                    </Button> 
                </Grid>   
            </Grid>
        </Box>
    );
}

export default AuthorModify;



// import { DateTime } from 'luxon';
// import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import Checkbox from '@mui/material/Checkbox';


    // // CHANGE AUTHOR DATE STATES
    // const handleChangeAuthorDate = (value, field) => {
    //     setAuthorData({...authorData, [field]: value});
    // };

    // // CHANGE AUTHOR CHECKBOX STATES
    // const handleChangeCheckboxEnable = (event) => {
    //     setAuthorData({ ...authorData, [event.target.name]: event.target.checked });
    // };


    // CREATE DATE BIRTH AND DEATH const 
    // useEffect(() => {
    //     const birthDate = DateTime.fromObject(row.birth).setLocale('pt-br');
    //     const deathDate = DateTime.fromObject(row.death).setLocale('pt-br');
    //     const authorDate = {...row, birth: birthDate, death: deathDate };
    //     //console.log(authorDate);
    //     setAuthorData(authorDate);
    // }, []);

                    {/* <Grid item md={4} xs={12}>
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
                    <Grid item md={4} xs={12}>   
                        <Grid container >
                            <Grid item xs={10} >
                                {authorData.has_birth ? (
                                    <DesktopDatePicker
                                        maxDate={authorData.death}
                                        label="Nascimento"
                                        clearable
                                        inputFormat="dd/MM/yyyy"
                                        value={authorData.birth}
                                        onChange={value => handleChangeAuthorDate(value, 'birth')}
                                        renderInput={(params) => <TextField size="small" id="birth" fullWidth InputLabelProps={{ shrink: true }} {...params} />}
                                    />
                                ) : (
                                    <TextField
                                        error={true}
                                        fullWidth
                                        shrink
                                        label="Nascimento"
                                        placeholder="sem registro"
                                        disabled={true}
                                        size="small"
                                        type="text"
                                        InputLabelProps={{ shrink: true }} 
                                    />
                                )}
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    name="has_birth"
                                    checked={authorData.has_birth}
                                    onChange={handleChangeCheckboxEnable}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid> 
                    <Grid item md={4} xs={12}>   
                        <Grid container>
                            <Grid item xs={10}>
                                {authorData.has_death ? (
                                    <DesktopDatePicker
                                        minDate={authorData.birth}
                                        label="Morte"
                                        clearable
                                        disableFuture
                                        inputFormat="dd/MM/yyyy"
                                        value={authorData.death} 
                                        onChange={value => handleChangeAuthorDate(value, 'death')}
                                        renderInput={(params) => <TextField size="small" id="death" fullWidth InputLabelProps={{ shrink: true }} {...params} />}
                                    />
                                ) : (
                                    <TextField
                                        error={true}
                                        fullWidth
                                        shrink
                                        label="Morte"
                                        placeholder="sem registro"
                                        disabled={true}
                                        size="small"
                                        type="text"
                                        InputLabelProps={{ shrink: true }} 
                                    />
                                )}
                            </Grid>
                            <Grid item xs={2}>
                                <Checkbox
                                    name="has_death"
                                    checked={authorData.has_death}
                                    onChange={handleChangeCheckboxEnable}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>    */}