import * as React from 'react';
import { useState, useEffect } from 'react';
import { updatePage } from '../features/pagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import TextEditorInstitutional from './TextEditorInstitutional';
import TextEditorTeam from './TextEditorTeam';
import TextEditorContribute from './TextEditorContribute';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Copyright from './Copyright';
import Title from './Title';    

const PagesEdit = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();
    const location = useLocation();
    const isInstitutionalPage = location.pathname.includes('apresentacao');
    const isTeamPage = location.pathname.includes('quemsomos');
    // const isContributePage = location.pathname.includes('colabore');
    const pageId = isInstitutionalPage ? 2 : (isTeamPage ? 5 : 3);

    // REDUX SELECTORS
    const dispatch = useDispatch();
    // const page = useSelector(state => state.pages.pages.find(p => p.id === parseInt(params.pageId, 10) ));
    const page = useSelector(state => state.pages.pages.find(p => p.id === pageId ));
    const statuses = useSelector(state => state.research.statuses);

    // EDIT PAGE STATES
    const [pageData, setPageData] = useState(page); //console.log('pageData',pageData);

    // TEXT EDITOR STATES
    const [readOnly, setReadOnly] = useState(false);

    // IMPORTANTE: Garanta que o body sempre tenha um valor válido
    useEffect(() => {
        if(page) {
        setPageData({
            ...page,
            body: page.body || "" // Garante que body não seja undefined
        });
        }
    }, [page]);

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
                            {/* <TextField
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
                                //error={true}
                                helperText="Título principal da página"
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
                                //error={true}
                                helperText="Termo do menu de navegação principal, que dá acesso à página"
                            /> */}

                            {/* <FormBox 
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
                            />         */}

                            {isInstitutionalPage ? 
                                <TextEditorInstitutional 
                                    value={pageData.body}
                                    setValue={body => setPageData({...pageData, body})}
                                    readOnly={readOnly}
                                    pageId={pageData.id}
                                /> : isTeamPage ? 
                                <TextEditorTeam
                                    value={pageData.body}
                                    setValue={body => setPageData({...pageData, body})}
                                    readOnly={readOnly}
                                    pageId={pageData.id}
                                /> :
                                <TextEditorContribute
                                    value={pageData.body}
                                    setValue={body => setPageData({...pageData, body})}
                                    readOnly={readOnly}
                                />
                            }

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
