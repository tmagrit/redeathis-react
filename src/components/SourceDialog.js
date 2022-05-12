import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useTableTemplates } from './tableTemplates';
import { DateTime } from 'luxon';
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

//import AuthorAdd from './AuthorAdd';
import Source from './Source';

const SourceDialog = (props) => {

    const { onClose, open } = props;

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates(); 

    // MY HISTORY HOOK
    const history = useHistory();
    const section = history?.pathArray[2] || ''
    const context = history?.pathArray[3] || ''

    // REDUX SELECTORS
    const sources = useSelector(state => state.research.sources);
    const researchList = useSelector(state => state.research.research);
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const categories = useSelector(state => state.research.categories);
    // AUTHORS
    const authors = useSelector(state => state.research.authors);
    const getSourcesStatus = useSelector(state => state.research.getSourcesStatus);

    // EDIT RESEARCH STATES
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }
    const [researchData, setResearchData] = useState(researchWithDate);
    const [sourcesArray, setSourcesArray] = useState([]);

    const createSourcesTable = Boolean( getSourcesStatus === "succeeded"  ) 
  
    
    const sourcesData = (researchdata, sources, categories) => {
        let sourcesdata = sources.map(s => {
            if(s.target_id === researchdata.id)
                return <Source key={s.id} source={s} research={s.research_source} color={categories.find(c => c.id === s.research_source.category_id ).color} />
            else
                return null;
        });

        return sourcesdata.slice();
    };

    // TRACK SOURCE CHANGES 
    useEffect(() => {
        let newSourcesArray = sourcesData(researchData, sources, categories);
        console.log('newSourcesArray-SourceDialog',newSourcesArray);
        setSourcesArray([...newSourcesArray]);
    }, [sources]);

    const handleClose = () => {
      onClose();
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

                    BUSCA
                   
                </Toolbar>
            </AppBar>

            <DialogTitle >
                Proponentes
            </DialogTitle>
            <DialogContent dividers>
                {sourcesArray}
            </DialogContent>
            <DialogTitle >
                Incluir Proponente
            </DialogTitle>
            <DialogContent dividers>
                {/* SOURCES TABLE  */}
                {createSourcesTable && authors.length > 0 ? (
                    <DataTable
                        columns={tableTemplates.researchSourcesColumns}
                        data={researchList}
                        customStyles={customStyles}
                        striped
                        //dense
                        responsive
                        pagination
                    />
                ) : (
                    <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                        Sem autores para exibir
                    </Typography>
                ) }
            </DialogContent>
        </Dialog>
    );
}

export default SourceDialog;
  
SourceDialog.propTypes = {
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