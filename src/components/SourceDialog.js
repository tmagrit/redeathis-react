import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { DateTime } from 'luxon';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
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

import Source from './Source';
import ActionRelateMenu from './ActionRelateMenu';

const SourceDialog = (props) => {

    const { onClose, open } = props;

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // MY HISTORY HOOK
    const history = useHistory();

    // REDUX SELECTORS
    const sources = useSelector(state => state.research.sources);
    const researchList = useSelector(state => state.research.research);
    const research = useSelector(state => state.research.research.find(r => r.id === parseInt(params.researchId, 10) ));
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);
    // AUTHORS
    const authors = useSelector(state => state.research.authors);
    const getSourcesStatus = useSelector(state => state.research.getSourcesStatus);

    // EDIT RESEARCH STATES
    const dateTime = { ...research.date, start: DateTime.fromObject(research.date.start), end: DateTime.fromObject(research.date.end) }
    const researchWithDate = { ...research, date: dateTime }
    const [researchData, setResearchData] = useState(researchWithDate);
    const [researchSources, setResearchSources] = useState([]);

    // TRACK SOURCE CHANGES 
    useEffect(() => {
        const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
        setResearchSources([...updatedResearchSources]);
    }, [sources]);

    const handleUpdateResearchSources = (sources) => {
        const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
        setResearchSources(updatedResearchSources);
    };

    const createSourcesTable = Boolean( getSourcesStatus === "succeeded"  ) 

    const handleClose = () => {
      onClose();
    };

    // COLUMNS TO SOURCES LIST
    const researchSourcesColumns = (
        [
            {
                name: 'ID',
                selector: row => row.id ,
                sortable: true,
                width: '70px',
            },
            {
                name: 'Título',
                selector: row => row.title,
                cell: row => <span style={{ wordBreak: "break-word" }}>{row.title}</span>, 
                sortable: true,
                grow: 3,
            },
            {
                name: 'Resumo',
                selector: row => row.summary,
                sortable: true,
                omit: true,
            },
            {
                name: 'Data',
                selector: row => 'date' ,
                sortable: true,
                maxWidth: '120px',
                grow: 1,
            },
            {
                name: 'Categoria',
                selector: row => row.category_id,
                cell: row => <Chip 
                                    label={categories.find(c => c.id === row.category_id).name} 
                                    size="small" 
                                    variant="outlined" 
                                />,
                sortable: true,
                maxWidth: '200px',
                grow: 1,
            },
            {
                name: 'Status',
                selector: row => row.status,
                cell: row => <Chip 
                                    label={statuses.find(s => s.id === row.status).status} 
                                    size="small" 
                                    variant="outlined" 
                                    color={statusColor(row.status)}
                                />,
                sortable: true,
                maxWidth: '140px',
                grow: 1,
            },
            {
                name: 'Ações',
                maxWidth: '100px',
                cell: row => <ActionRelateMenu section={'research'} sourceAction={() => handleUpdateResearchSources(sources)} row={row} source={researchSources.find(rs => rs.source_id === row.id)} />,
                right: true,
                grow: 1,
            },
        ]
    );
    // CONDITIONAL ROW STYLING
    const conditionalRowStyles = [
        {
            //when: row => researchSources.includes(row.id),
            when: row => researchSources.map(rs => {return rs.source_id}).includes(row.id),
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.3)',
                //color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
    ];

    // STATUS TABLE COLORS
    function statusColor(id) {
        if(id === 1)
            return 'success';
        if(id === 2)
            return 'primary'
        if(id === 3)
            return 'warning'
        if(id === 4)
            return 'error'    
    }

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
            <DialogContent dividers sx={{ minHeight: 200, }}>
                {researchSources?.map((rs, index) => {
                    return  <Source 
                                key={rs.id}
                                source={rs} 
                                sourceAction={() => handleUpdateResearchSources(sources)} 
                                color={categories.find(c => c.id === rs.research_source.category_id ).color} 
                            />
                })}
            </DialogContent>
            <DialogTitle >
                Incluir Proponente
            </DialogTitle>
            <DialogContent dividers>
                {/* SOURCES TABLE  */}
                {createSourcesTable && authors.length > 0 ? (
                    <DataTable
                        //columns={tableTemplates.researchSourcesColumns} 
                        columns={researchSourcesColumns}
                        data={researchList}
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

export default SourceDialog;
  
SourceDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

