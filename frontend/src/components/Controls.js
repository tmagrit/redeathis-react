import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { publicTheme, Paper } from '../styles/publicStyles';

const PublicMenuBar = (props) => {

    const { open, setOpen } = props;

    const [researchSearchDialog, setResearchSearchDialog] = useState(false);

    // HANDLE DIALOG
    const handleResearchSearchDialog = () => {
        setResearchSearchDialog(!researchSearchDialog);
    }; 

    return ( 
        <ThemeProvider theme={publicTheme} > 
            <Paper 
                open={open}
                elevation={1} 
                square
            >
                <IconButton onClick={handleResearchSearchDialog} >
                    <ManageSearchIcon />
                </IconButton>
                <Divider />
                <IconButton  onClick={setOpen} >
                    <FilterAltIcon />
                </IconButton>
                <Divider />
                <IconButton >
                    <TravelExploreIcon />
                </IconButton>
            </Paper>

            {/* RESEARCH SEARCH DIALOG */}
            <Dialog 
                fullWidth	
                PaperProps={{ square: true, }}
                onClose={handleResearchSearchDialog} 
                open={researchSearchDialog} 
                >
                <DialogTitle> 
                    <SearchBar />
                </DialogTitle>    
                
                <Divider />

                <DialogContent>
                    <SearchResults />
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
};

export default PublicMenuBar;