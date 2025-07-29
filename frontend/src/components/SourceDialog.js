import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectResearchRelations, } from '../features/researchSlice';

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
    const allResearchRelations = useSelector(selectResearchRelations); //console.log('allResearchRelations',allResearchRelations);
    const localResearchSources = allResearchRelations.find(arr => arr.id === parseInt(params.researchId, 10)); //console.log('localResearchSources',localResearchSources);
    const allLocalResearchSources = localResearchSources.relations ?? []; //console.log('allLocalResearchSources',allLocalResearchSources);


    const sources = useSelector(state => state.research.sources);
    const getSourcesStatus = useSelector(state => state.research.getSourcesStatus);
    const addSourceStatus = useSelector(state => state.research.addSourceStatus);
    const researchList = useSelector(state => state.research.research).filter(rl => rl.id !== parseInt(params.researchId, 10) ); //console.log('researchList',researchList);
    const categories = useSelector(state => state.research.categories);

    // STATE
    // const [researchSources, setResearchSources] = useState([]); console.log('researchSources',researchSources);

    const createSourcesTable = Boolean( getSourcesStatus === "succeeded"  ) 

    const handleClose = () => {
      onClose();
    };

    // TRACK SOURCE CHANGES 
    // useEffect(() => {
    //     const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
    //     setResearchSources([...updatedResearchSources]);
    // }, [sources, addSourceStatus, params.researchId]);

    // const handleUpdateResearchSources = (sources) => {
    //     const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
    //     setResearchSources(updatedResearchSources);
    // };

    const conditionalRowStyles = [
        {
            when: row => allLocalResearchSources.map(alrs => {return alrs.id}).includes(row.id),
            style: {
                backgroundColor: 'lightgreen',
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
                    {/* {researchSources.map(rs => {
                        return  <Source 
                                    key={rs.id}
                                    source={rs} 
                                    sourceAction={() => handleUpdateResearchSources(sources)} 
                                    color={categories.find(c => c.id === rs.research_source.category_id ).color} 
                                />
                    })} */}

                    {allLocalResearchSources && allLocalResearchSources.map(alrs => {
                        const source = {
                            researchId: parseInt(params.researchId, 10), 
                            relatedResearch: alrs
                        };
                        return  <Source 
                                    key={alrs.id}
                                    source={source} 
                                    // sourceAction={() => handleUpdateResearchSources(sources)} 
                                    color={categories.find(c => c.id === alrs.category_id).color} 
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