import * as React from 'react';
import { useState, useEffect } from 'react';
import { updatePage } from '../features/pagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import TextEditor from './TextEditor';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab'; 
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import Copyright from './Copyright';
import Title from './Title';    
import FormBox from './FormBox';


const PagesEdit = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const page = useSelector(state => state.pages.pages.find(p => p.id === parseInt(params.pageId, 10) ));
    const statuses = useSelector(state => state.research.statuses);

    // EDIT PAGE STATES
    const [pageData, setPageData] = useState(page);

    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);

    // CHANGE PAGE STATES
    const handleChangePageData = (event) => {
        setPageData({...pageData, [event.target.name]: event.target.value});
    };

    // UPDATE PAGE
    const handleUpdatePage = () => {
        dispatch(updatePage(pageData))
    };


    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* LEFT PANEL */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'left'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <TextField
                                value={pageData.title}
                                onChange={(event) => handleChangePageData(event)}
                                fullWidth
                                label="Título"
                                name="title"
                                size="small"
                                multiline={true}
                                minRows={1}
                                maxRows={2}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                                //error={emailError(email)}
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                            />

                            <TextField
                                value={pageData.slug}
                                onChange={(event) => handleChangePageData(event)}
                                fullWidth
                                label="Título de Menu"
                                name="slug"
                                size="small"
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                                //error={emailError(email)}
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                            />

                            <FormBox 
                                id='text-editor-box' 
                                label='Conteúdo'
                                padding={{ p: 0, }} 
                                children={
                                    <TextEditor 
                                        value={pageData.body}
                                        setValue={body => setPageData({...pageData, body})}
                                        readOnly={readOnly}
                                    />
                                } 
                            />        

                        </Grid>
                    </Paper>
                </Grid>

                {/* RIGHT PANEL */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ mb: 3, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'right'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <TextField
                                name="status"
                                select
                                label="Status"
                                size="small"
                                value={pageData.status}
                                onChange={(event) => handleChangePageData(event)}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            >
                                {statuses.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.status}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                sx={{ my: 2,}} 
                                onClick={handleUpdatePage}  
                            >
                                Atualizar
                            </Button>
                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Copyright sx={{ pt: 4 }} />

        </Container>
    )
};

export default PagesEdit;
