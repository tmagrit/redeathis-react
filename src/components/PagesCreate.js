import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPage } from '../features/pagesSlice';

import TextField from '@mui/material/TextField';
import TextEditor from './TextEditor';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import Copyright from './Copyright';
import Title from './Title';   
import FormBox from './FormBox';


const PagesCreate = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const statuses = useSelector(state => state.research.statuses);

    // START NEW RESEARCH OBJECT

    const page = {
        title: '',
        slug: '',
        body: '',
        status: 2
    }

    // EDIT RESEARCH STATES
    const [pageData, setPageData] = useState({ ...page });

    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);
    
    // CHANGE PAGE STATES
    const handleChangePageData = (event) => {
        setPageData({...pageData, [event.target.name]: event.target.value});
    };

    // CREATE PAGE
    const handleCreatePage = () => {
        dispatch(createPage(pageData));
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* LEFT PANEL */}
                <Grid item xs={12} md={8}>
                    <Paper >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'left'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <TextField
                                value={pageData.title}
                                //error={emailError(email)}
                                onChange={(event) => handleChangePageData(event)}
                                fullWidth
                                label="Título"
                                name="title"
                                size="small"
                                multiline={true}
                                minRows={1}
                                maxRows={2}
                                type="text"
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                value={pageData.slug}
                                //error={emailError(email)}
                                onChange={(event) => handleChangePageData(event)}
                                fullWidth
                                label="Título de Menu"
                                name="slug"
                                size="small"
                                type="text"
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
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
                                onClick={handleCreatePage}  
                            >
                                Criar
                            </Button>
                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Copyright sx={{ pt: 4 }} />
            
        </Container>
    )
};

export default PagesCreate;