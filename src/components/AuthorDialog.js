import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
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

import Author from './Author';
import ActionAuthorMenu from './ActionAuthorMenu';

const AuthorDialog = (props) => {

    const { onClose, open } = props;

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
        const updatedResearchAuthors = allResearchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) );
        setResearchAuthors([...updatedResearchAuthors]);
    }, [allResearchAuthors, addResearchAuthorStatus, params.researchId]);

    const handleUpdateResearchAuthors = (allresearchauthors) => {
        const updatedResearchAuthors = allresearchauthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) );
        setResearchAuthors(updatedResearchAuthors);
    };

    const createAuthorTable = Boolean( getResearchAuthorsStatus === "succeeded"  ) 

    const handleClose = () => {
      onClose();
    };


    // COLUMNS TO AUTHORS LIST
    const authorsSourcesColumns = (
        [
            {
                name: 'ID',
                selector: row => row.id ,
                sortable: true,
                width: '70px',
            },
            {
                name: 'Nome',
                selector: row => row.name + ' ' + row.surname ,
                sortable: true,
                grow: 3,
            },
            {
                name: 'Nascimento',
                selector: row => row.has_birth ? DateTime.fromObject(row.birth).setLocale('pt-br').toFormat('dd/MM/yyyy') : 'sem registro',
                cell: row => row.has_birth ? DateTime.fromObject(row.birth).setLocale('pt-br').toFormat('dd/MM/yyyy') : <Typography variant="caption" sx={{ fontStyle: 'italic', }} >sem registro</Typography>,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Morte',
                selector: row => row.has_death ? DateTime.fromObject(row.death).setLocale('pt-br').toFormat('dd/MM/yyyy') : 'sem registro',
                cell: row => row.has_death ? DateTime.fromObject(row.death).setLocale('pt-br').toFormat('dd/MM/yyyy') : <Typography variant="caption" sx={{ fontStyle: 'italic', }} >sem registro</Typography>,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Ações',
                maxWidth: '100px',
                cell: row =>    <ActionAuthorMenu 
                                    section={'research'} 
                                    authorAction={() => handleUpdateResearchAuthors(allResearchAuthors)} 
                                    row={row} 
                                    researchAuthor={researchAuthors.find(ra => ra.author_id === row.id)} 
                                />,
                right: true,
                grow: 1,
            },
        ]
    );

    // CONDITIONAL ROW STYLING
    const conditionalRowStyles = [
        {
            when: row => researchAuthors.map(ra => {return ra.author_id}).includes(row.id),
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
                Autores
            </DialogTitle>
            <DialogContent dividers sx={{ minHeight: 200, }}>
                {researchAuthors?.map(ra => {
                    return  <Author 
                                key={ra.id}
                                researchAuthor={ra} 
                                authorAction={() => handleUpdateResearchAuthors(allResearchAuthors)} 
                            />
                })}
            </DialogContent>
            <DialogTitle >
                Incluir Autor
            </DialogTitle>
            <DialogContent dividers>
                {/* SOURCES TABLE  */}
                {createAuthorTable && authors.length > 0 ? (
                    <DataTable
                        columns={authorsSourcesColumns}
                        data={authors}
                        customStyles={customStyles}
                        striped
                        conditionalRowStyles={conditionalRowStyles}
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

export default AuthorDialog;
  
AuthorDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};