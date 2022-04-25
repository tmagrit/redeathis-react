import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import TextEditor from './TextEditor';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';

import Copyright from './Copyright';
import Title from './Title';   
import Index from './Index';  

const CreateResearch = () => {

    // REDUX SELECTORS
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);

    // EDIT RESEARCH STATES
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [link, setLink] = useState('');
    const [notes, setNotes] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [statusId, setStatusId] = useState(statuses[1].status || '');
    const [geolocation, setGeolocation] = useState({});
    const [date, setDate] = useState({});
    
    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);

    // CHANGE RESEARCH STATES
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleChangeLink = (event) => {
        setLink(event.target.value);
    };
    const handleChangeNotes = (event) => {
        setNotes(event.target.value);
    }; 
    const handleChangeStatus = (event) => {
        setStatusId(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategoryId(event.target.value);
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
                                value={title}
                                //error={emailError(email)}
                                onChange={handleChangeTitle}
                                fullWidth
                                label="Título"
                                id="title"
                                size="small"
                                multiline={true}
                                minRows={1}
                                maxRows={2}
                                type="text"
                                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextEditor 
                                value={summary}
                                setValue={summary => setSummary(summary)}
                                readOnly={readOnly}
                            />

                            <TextField
                                value={link}
                                onChange={handleChangeLink}
                                fullWidth
                                label="Link"
                                id="link"
                                size="small"
                                type="url"
                                sx={{ my: 1,}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                value={notes}
                                onChange={handleChangeNotes}
                                fullWidth
                                label="Notas"
                                id="notes"
                                size="small"
                                multiline={true}
                                minRows={5}
                                maxRows={10}
                                type="text"
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
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
                                id="status"
                                select
                                label="Status"
                                size="small"
                                value={statusId}
                                onChange={handleChangeStatus}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            >
                                {statuses.map((c) => (
                                    <MenuItem key={c.id} value={c.status}>
                                        {c.status}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="category"
                                select
                                label="Categoria"
                                size="small"
                                value={categoryId}
                                onChange={handleChangeCategory}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            >
                                {categories.map((c) => (
                                <MenuItem key={c.id} value={c.name}>
                                    {c.name}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Paper>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'rightbelow'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            
                            
                            
                            
                            
                            {/* <TextField
                                id="status"
                                select
                                label="Status"
                                size="small"
                                value={statusId}
                                onChange={handleChangeStatus}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            >
                                {statuses.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.status}
                                    </MenuItem>
                                ))}
                            </TextField> */}


                            
                        </Grid>
                    </Paper>
                </Grid>

                {/* INDEX */}
                <Grid item xs={12}>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', }}>
                            <Title position={'middle'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <Index />
                        </Grid>
                    </Paper>
                </Grid>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default CreateResearch;
