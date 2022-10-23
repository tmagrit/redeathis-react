import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTableTemplates } from './tableTemplates';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from './Copyright';
import Title from './Title'; 

import AuthorAdd from './AuthorAdd';
import FilteredDataTable from './FilteredDataTable';

const AuthorIndex = () => {

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates(); 

    // REDUX SELECTORS
    const authors = useSelector(state => state.research.authors);
    const getAuthorsStatus = useSelector(state => state.research.getAuthorsStatus);

    const createAuthorsTable = Boolean( getAuthorsStatus === "succeeded"  ) 
                                   
    const index = () => {
        return (
            <Grid item xs={12}>
                {createAuthorsTable && authors.length > 0 ? (
                    <FilteredDataTable 
                        data={authors} 
                        columns={tableTemplates.authorsColumns}
                        title={<Title position={'middle'}/>}
                    />
                ) : (
                    <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                        Sem dados para exibir
                    </Typography>
                )}
            </Grid>
        );
    };    

    const add = () => {
        return (
            <Grid item xs={12}>
                <Paper elevation={0} square>
                    <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', }}>
                        <Typography component="div" variant="body1" color="inherit" gutterBottom sx={{ fontWeight: 600, }}>
                            Novo Autor
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                        <AuthorAdd />
                    </Grid>
                </Paper>
            </Grid>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {add()} 
                {index()}  
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );

};

export default AuthorIndex;