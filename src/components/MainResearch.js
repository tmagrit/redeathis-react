import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Copyright from './Copyright';
import Title from './Title';   
import Index from './Index';  

const MainResearch = () => {

    // REDUX SELECTORS
    const section = useSelector(state => state.session.section);
    const context = useSelector(state => state.session.context);

    function upperPanels(context) {
        if(context === '' || context === 'create' || context === 'creategroup' || context === 'createtag' || context === 'edit' )
            return true;
        else
            return false;
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
                            MAIN RESEARCH CONTENT
                        </Grid>
                    </Paper>
                </Grid>

                {/* RIGHT PANEL */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'right'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            RIGHT MAIN RESEARCH CONTENT
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

export default MainResearch;

// {/* <TextField
//                                 value={title}
//                                 //error={emailError(email)}
//                                 onChange={handleChangeTitle}
//                                 fullWidth
//                                 label="Título"
//                                 id="title"
//                                 size="small"
//                                 multiline={true}
//                                 minRows={1}
//                                 maxRows={2}
//                                 type="text"
//                                 //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
//                                 sx={{ my: 1,}}
//                                 InputLabelProps={{ shrink: true }}
//                             />

//                             <TextEditor 
//                                 value={summary}
//                                 setValue={summary => setSummary(summary)}
//                                 readOnly={readOnly}
//                             />

//                             <TextField
//                                 value={link}
//                                 onChange={handleChangeLink}
//                                 fullWidth
//                                 label="Link"
//                                 id="link"
//                                 size="small"
//                                 type="url"
//                                 sx={{ my: 1,}}
//                                 InputProps={{
//                                     startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment>,
//                                 }}
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                             <TextField
//                                 value={notes}
//                                 onChange={handleChangeNotes}
//                                 fullWidth
//                                 label="Notas"
//                                 id="notes"
//                                 size="small"
//                                 multiline={true}
//                                 minRows={5}
//                                 maxRows={10}
//                                 type="text"
//                                 sx={{ my: 1,}}
//                                 InputLabelProps={{ shrink: true }}
//                             /> */}