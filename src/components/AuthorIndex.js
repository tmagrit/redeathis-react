import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTableTemplates } from './tableTemplates';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Copyright from './Copyright';

import AuthorAdd from './AuthorAdd';

// REACT DATA TABLE COMPONENT
import DataTable from 'react-data-table-component';
import { customStyles } from '../styles/tableTemplatesStyles'

// MY HISTORY HOOK
import { useHistory } from './history';

const AuthorIndex = () => {

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates(); 

    // MY HISTORY HOOK
    const history = useHistory();
    const section = history?.pathArray[2] || ''
    const context = history?.pathArray[3] || ''

    // REDUX SELECTORS
    // AUTHORS
    const authors = useSelector(state => state.research.authors);
    const getAuthorsStatus = useSelector(state => state.research.getAuthorsStatus);

    const createAuthorsTable = Boolean( getAuthorsStatus === "succeeded"  ) 
                                   
    const index = () => {
        return (
            <Grid item xs={12}>
                <Paper sx={{ minHeight: 240, }} >
                    <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', }}>
                        <Typography component="div" variant="body1" color="inherit" gutterBottom sx={{ fontWeight: 600, }}>
                            Índice de Autores
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                        {/* AUTHORS TABLE  */}
                        {createAuthorsTable && authors.length > 0 ? (
                            <DataTable
                                columns={tableTemplates.authorsColumns}
                                data={authors}
                                customStyles={customStyles}
                                striped
                                responsive
                                //selectableRows
                                pagination
                            />
                        ) : (
                            <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                                Sem autores para exibir
                            </Typography>
                        ) }
                    </Grid>
                </Paper>
            </Grid>
        );
    };    

    const add = () => {
        return (
            <Grid item xs={12}>
                <Paper >
                    <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'row', }}>
                        <Typography component="div" variant="body1" color="inherit" gutterBottom sx={{ fontWeight: 600, }}>
                            Cadastrar Autor
                        </Typography>
                    </Grid>
                    <Divider />
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