import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTableTemplates } from './tableTemplates';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

// REACT DATA TABLE COMPONENT
import DataTable from 'react-data-table-component';
import { customStyles } from '../styles/tableTemplatesStyles'

// MY HISTORY HOOK
import { useHistory } from './history';

import AuthorAdd from './AuthorAdd';

const SourceDialog = (props) => {

    const { onClose, open, mode } = props;

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
  
    const [modeValue, setModeValue] = useState(mode);
    
    const handleClose = () => {
      onClose();
    };
  

    const authorSource = () => {
        return (
            <React.Fragment>
                <DialogTitle >
                    Cadastrar Novo Autor
                </DialogTitle>
                <DialogContent dividers>
                    <AuthorAdd />
                </DialogContent>
                <DialogTitle >
                    Relacionar Autores
                </DialogTitle>
                <DialogContent dividers>
                    {/* AUTHORS TABLE  */}
                    {createAuthorsTable && authors.length > 0 ? (
                        <DataTable
                            columns={tableTemplates.authorsSourcesColumns}
                            data={authors}
                            customStyles={customStyles}
                            striped
                            dense
                            responsive
                            pagination
                        />
                    ) : (
                        <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                            Sem autores para exibir
                        </Typography>
                    ) }
                </DialogContent>
            </React.Fragment>
        );
    };    

    return (
        <Dialog 
            onClose={handleClose} 
            open={open} 
            fullWidth={true}
            maxWidth='lg'
        >
            <AppBar position="static" color="inherit">
                <Toolbar  variant="dense" >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color={modeValue === 'author' ? "primary" : "inherit"} onClick={() => setModeValue('author')}>Autores</Button>
                    <Button color={modeValue === 'research' ? "primary" : "inherit"} onClick={() => setModeValue('research')}>Instituições</Button>
                    
                </Toolbar>
            </AppBar>

            {modeValue === 'author' ? authorSource() : 'tabelaInstituicoes' }

        </Dialog>
    );
}

export default SourceDialog;
  
SourceDialog.propTypes = {
    mode: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};





















// const authorSource = () => {
//     return (
//         <Container maxWidth="xl" >
//             <Grid container spacing={2} >
//                 <Grid item xs={12} >
//                     <Typography component="div" variant="body1" color="inherit" gutterBottom sx={{ fontWeight: 600, }}>
//                         Relacionar Autores
//                     </Typography>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} >
//                     {/* AUTHORS TABLE  */}
//                     {createAuthorsTable && authors.length > 0 ? (
//                         <DataTable
//                             columns={tableTemplates.authorsColumns}
//                             data={authors}
//                             customStyles={customStyles}
//                             striped
//                             responsive
//                             pagination
//                         />
//                     ) : (
//                         <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
//                             Sem autores para exibir
//                         </Typography>
//                     ) }
//                 </Grid>
//                 <Grid item xs={12} >
//                     <Typography component="div" variant="body1" color="inherit" gutterBottom sx={{ fontWeight: 600, }}>
//                         Cadastrar Autor
//                     </Typography>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
//                     <AuthorAdd />
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };    