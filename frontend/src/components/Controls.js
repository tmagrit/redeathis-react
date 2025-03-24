import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredTagsArray } from '../features/researchSlice'; 
import { ThemeProvider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import TimelapseIcon from '@mui/icons-material/Timelapse';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { publicTheme, PaperControls } from '../styles/publicStyles';
// import { isFullTimeInterval } from './isFullTimeInterval';

const Controls = (props) => {

    const { open, setOpen, show } = props;

    //REDUX SELECTORS
    const filteredTags = useSelector(selectFilteredTagsArray); 
    const minYear = useSelector(state => state.research.researchMinYear); 
    const researchTimeInterval = useSelector(state => state.research.timeInterval); 

    const [researchSearchDialog, setResearchSearchDialog] = useState(false);

    // HANDLE DIALOG
    const handleResearchSearchDialog = () => {
        setResearchSearchDialog(!researchSearchDialog);
    }; 

    return ( 
        <ThemeProvider theme={publicTheme} > 
            <PaperControls 
                open={open}
                show={show}
                elevation={6} 
                square
                
            >
                <IconButton 
                    onClick={handleResearchSearchDialog}
                    //color={filteredTags.length > 0 ? 'secondary' : 'primary'}
                    sx={{
                        color: '#846a47',
                        borderRadius: '0',
                        "& .MuiTouchRipple-root .MuiTouchRipple-child": {
                            borderRadius: '0',
                            },
                    }} 
                >
                    <ManageSearchIcon />
                </IconButton>
                <Divider />
                <IconButton 
                    onClick={setOpen}
                    //color={filteredTags.length > 0 ? '#846a47' : 'red'}
                    sx={{
                        color: filteredTags.length > 0 ? '#F5A449' : 'primary.main',
                        borderRadius: '0',
                        "& .MuiTouchRipple-root .MuiTouchRipple-child": {
                            borderRadius: '0',
                            },
                    }} 
                >
                    <FilterAltIcon />
                </IconButton>
                {/* <Divider />
                <IconButton 
                    sx={{
                        color: 'primary.main',
                        borderRadius: '0',
                        "& .MuiTouchRipple-root .MuiTouchRipple-child": {
                            borderRadius: '0',
                            },
                    }} 
                >
                    <TravelExploreIcon />
                </IconButton> */}
            </PaperControls>

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

export default Controls;