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
import Author from './Author';
import FilteredDataTable from './FilteredDataTable';
import { useTableTemplates } from './tableTemplates';

const AuthorDialog = (props) => {

    const { onClose, open } = props;

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates();     

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const allResearchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) ));
    const getResearchAuthorsStatus = useSelector(state => state.research.getResearchAuthorsStatus);
    const addResearchAuthorStatus = useSelector(state => state.research.addResearchAuthorStatus);
    const authors = useSelector(state => state.research.authors);
       
    // RESEARCH AUTHORS STATES
    const [researchAuthors, setResearchAuthors] = useState([]);

    // TRACK RESEARCH AUTHORS CHANGES 
    useEffect(() => {
        if (addResearchAuthorStatus === 'succeeded') {
            const updatedResearchAuthors = allResearchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10));
            setResearchAuthors([...updatedResearchAuthors]);
        }
    }, [allResearchAuthors, addResearchAuthorStatus, params.researchId]);

    // useEffect(() => {
    //     const updatedResearchAuthors = allResearchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) );
    //     setResearchAuthors([...updatedResearchAuthors]);
    // }, [allResearchAuthors, addResearchAuthorStatus, params.researchId]);

    const handleUpdateResearchAuthors = (allresearchauthors) => {
        const updatedResearchAuthors = allresearchauthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) );
        setResearchAuthors(updatedResearchAuthors);
    };

    const createAuthorTable = Boolean( getResearchAuthorsStatus === "succeeded"  ) 

    const handleClose = () => {
      onClose();
    };

    // CONDITIONAL ROW STYLING
    const conditionalRowStyles = [
        {
            when: row => researchAuthors.map(ra => {return ra.author_id}).includes(row.id),
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

            <DialogContent dividers sx={{ minHeight: 70, }}>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={0.5}
                >
                    {researchAuthors?.map(ra => {
                        return (
                            <Author 
                                key={ra.id}
                                researchAuthor={ra} 
                                authorAction={() => handleUpdateResearchAuthors(allResearchAuthors)} 
                            />
                        )    
                    })}
                </Stack>       
            </DialogContent>
            
            <DialogContent >
                {/* SOURCES TABLE  */}
                {createAuthorTable && authors.length > 0 ? (
                    <FilteredDataTable 
                        data={authors} 
                        columns={tableTemplates.authorsSourcesColumns}
                        title=""
                        conditionalRowStyles={conditionalRowStyles}
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

export default AuthorDialog;
  
AuthorDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};