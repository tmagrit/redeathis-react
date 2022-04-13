import * as React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import DefaultDialog from './DefaultDialog';
import Invite from './Invite';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import ArticleIcon from '@mui/icons-material/Article';
import LayersIcon from '@mui/icons-material/Layers';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MainMenu = ({ section, context }) => {

    // DIALOG STATES 
    const [dialogOpen, setDialogOpen] = useState(false);

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = (value) => {
        setDialogOpen(false);
    };

    function activeMenu(section, context, link) {
        if(section === link)
            return true;
        else
            return false;
    };

    if(section === 'admin')
        return null;

    if(section === 'research')
        return (
            null
        );
        
    if(section === 'categories')
        return (
            null
        );      
    
    if(section === 'members')
        return (
            <React.Fragment>

            <ListItemButton component={Link} to="/admin/members/all" selected={activeMenu(section,'research')} >
                <ListItemIcon>
                    <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Ver Todos" />
            </ListItemButton>

            <ListItemButton >
                <ListItemIcon>
                    <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Convidar" onClick={handleDialogOpen}/>
            </ListItemButton>

            {/* INVITE DIALOG */}
            <DefaultDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                title={'Convidar Colaborador'}
                children={<Invite/>}
            />

            <ListItemButton component={Link} to="/admin" >
                <ListItemIcon>
                    <ArrowBackIcon />  
                </ListItemIcon>
                <ListItemText primary="Principal" />
            </ListItemButton>

        </React.Fragment>
        );  
        
    if(section === 'research')
        return (
            null
        );  

};

export default MainMenu;