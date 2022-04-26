import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createResearch } from '../features/researchSlice';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import TextEditor from './TextEditor';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import Copyright from './Copyright';
import Title from './Title';   
import Index from './Index';  

const CreateResearch = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);

    // START NEW RESEARCH OBJECT
    const research = {
        title: '',
        summary: '<p></p>',
        date: null,
        geolocation: null,
        link: '',
        notes: '',
        category_id: null,
        status: null
    }

    // EDIT RESEARCH STATES
    const [researchData, setResearchData] = useState(research);

    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);
    
    // CHANGE RESEARCH STATES
    const handleChangeResearchData = (event) => {
        setResearchData({...researchData, [event.target.name]: event.target.value});
    };

    // CREATE RESEARCH
    const handleCreateResearch = () => {
        dispatch(createResearch(researchData))
    }


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
                                value={researchData.title}
                                //error={emailError(email)}
                                onChange={(event) => handleChangeResearchData(event)}
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
                                name="category_id"
                                select
                                label="Categoria"
                                size="small"
                                value={researchData.category_id}
                                onChange={(event) => handleChangeResearchData(event)}
                                sx={{ my: 1,}}
                                InputLabelProps={{ shrink: true }}
                            >
                                {categories.map((c) => (
                                <MenuItem key={c.id} value={c.id} >
                                    {c.name}
                                </MenuItem>
                                ))}
                            </TextField>

                            <TextEditor 
                                value={researchData.summary}
                                setValue={summary => setResearchData({...researchData, summary})}
                                readOnly={readOnly}
                            />

                            <TextField
                                value={researchData.link}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Link"
                                name="link"
                                size="small"
                                type="url"
                                sx={{ my: 1,}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                value={researchData.notes}
                                onChange={(event) => handleChangeResearchData(event)}
                                fullWidth
                                label="Notas"
                                name="notes"
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
                                name="status"
                                select
                                label="Status"
                                size="small"
                                value={researchData.status}
                                onChange={(event) => handleChangeResearchData(event)}
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
                                onClick={handleCreateResearch}  
                            >
                                Salvar
                            </Button>
                            
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




    // // CHANGE RESEARCH STATES
    // const handleChangeTitle = (event) => {
    //     setTitle(event.target.value);
    // };
    // const handleChangeLink = (event) => {
    //     setLink(event.target.value);
    // };
    // const handleChangeNotes = (event) => {
    //     setNotes(event.target.value);
    // }; 
    // const handleChangeStatus = (event) => {
    //     setStatusId(event.target.value);
    // };
    // const handleChangeCategory = (event) => {
    //     setCategoryId(event.target.value);
    // };

    
    // const [title, setTitle] = useState('');
    // const [summary, setSummary] = useState('');
    // const [link, setLink] = useState('');
    // const [notes, setNotes] = useState('');
    // const [categoryId, setCategoryId] = useState('');
    // const [statusId, setStatusId] = useState(statuses[1].status || '');
    // const [geolocation, setGeolocation] = useState({});
    // const [date, setDate] = useState({});