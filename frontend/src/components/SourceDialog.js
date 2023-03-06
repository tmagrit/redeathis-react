import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FilteredDataTable from './FilteredDataTable';
import { useTableTemplates } from './tableTemplates';
import Source from './Source';

const SourceDialog = (props) => {

    const { onClose, open } = props;

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates();   

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const sources = useSelector(state => state.research.sources);
    const getSourcesStatus = useSelector(state => state.research.getSourcesStatus);
    const addSourceStatus = useSelector(state => state.research.addSourceStatus);
    const researchList = useSelector(state => state.research.research);
    //const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const categories = useSelector(state => state.research.categories);
    //const statuses = useSelector(state => state.research.statuses);

    // STATE
    const [researchSources, setResearchSources] = useState([]);

    const createSourcesTable = Boolean( getSourcesStatus === "succeeded"  ) 

    const handleClose = () => {
      onClose();
    };

    // TRACK SOURCE CHANGES 
    useEffect(() => {
        const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
        setResearchSources([...updatedResearchSources]);
    }, [sources, addSourceStatus, params.researchId]);

    const handleUpdateResearchSources = (sources) => {
        const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
        setResearchSources(updatedResearchSources);
    };

    // CONDITIONAL ROW STYLING
    const conditionalRowStyles = [
        {
            when: row => researchSources.map(rs => {return rs.source_id}).includes(row.id),
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.3)',
            },
        },
    ];

    return (
        <Dialog 
            onClose={handleClose} 
            open={open} 
            fullWidth={true}
            maxWidth='lg'
        >
            <AppBar position="static" color="inherit" elevation={0}>
                <Toolbar  variant="dense" >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, }} />
                </Toolbar>
            </AppBar>

            <DialogContent dividers sx={{ minHeight: 150, }}>
                <Stack 
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={0.5}
                >
                    {researchSources.map(rs => {
                        return  <Source 
                                    key={rs.id}
                                    source={rs} 
                                    sourceAction={() => handleUpdateResearchSources(sources)} 
                                    color={categories.find(c => c.id === rs.research_source.category_id ).color} 
                                />
                    })}
                </Stack>     
            </DialogContent>

            <DialogContent >
                {/* SOURCES TABLE  */}
                {createSourcesTable && researchList.length > 0 ? (
                    <FilteredDataTable 
                        data={researchList} 
                        columns={tableTemplates.researchSourcesColumns}
                        title=""
                        conditionalRowStyles={conditionalRowStyles}
                    />
                ) : (
                    <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                        Sem pesquisas para exibir
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

//import { DateTime } from 'luxon';
//import Chip from '@mui/material/Chip';
//import DialogTitle from '@mui/material/DialogTitle';
// import SearchIcon from '@mui/icons-material/Search';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// REACT DATA TABLE COMPONENT
// import DataTable from 'react-data-table-component';
// import { customStyles } from '../styles/tableTemplatesStyles'
// import ActionSourceMenu from './ActionSourceMenu';


    // AUTHORS
    //const authors = useSelector(state => state.research.authors);
    

    // EDIT RESEARCH STATES
    // const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    // const researchWithDate = { ...research, date: dateTime }
    // const [researchData, setResearchData] = useState(researchWithDate);


////////////////////////////
                        // <DataTable
                    //     columns={researchSourcesColumns}
                    //     data={researchList}
                    //     customStyles={customStyles}
                    //     striped
                    //     conditionalRowStyles={conditionalRowStyles}
                    //     responsive
                    //     pagination
                    // />