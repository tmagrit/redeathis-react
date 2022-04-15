import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import DefaultDialog from './DefaultDialog';
import Invite from './Invite';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewListIcon from '@mui/icons-material/ViewList';
import ArticleIcon from '@mui/icons-material/Article';
import LayersIcon from '@mui/icons-material/Layers';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// MY HISTORY HOOK
import { useHistory } from './history';

const MainMenu = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch()
    const section = useSelector(state => state.session.profile.section)
    const context = useSelector(state => state.session.profile.context)

    // MY HISTORY HOOK
    const history = useHistory();

    // DIALOG STATES 
    const [dialogOpen, setDialogOpen] = useState(false);

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = (value) => {
        setDialogOpen(false);
    };

    function activeMenu(context, match) {
        if(context === match)
            return true;
        else
            return false;
    };

    if(section === 'research')
    return (
        <React.Fragment>

            <ListItemButton component={Link} to="/admin/research/all" selected={activeMenu(context,'all')} >
                <ListItemIcon>
                    <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Ver Todas" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/research/create" selected={activeMenu(context,'create')} >
                <ListItemIcon>
                    <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Criar" />
            </ListItemButton>

            <ListItemButton onClick={() => history.goBack()} >
                <ListItemIcon>
                    <ArrowBackIcon />  
                </ListItemIcon>
            <ListItemText primary="Voltar" />
        </ListItemButton>

        </React.Fragment>
    );
        
    if(section === 'categories')
        return (
            'categories'
        );      
    
    if(section === 'members')
        return (
            <React.Fragment>

                <ListItemButton component={Link} to="/admin/members/all" selected={activeMenu(context,'all')} >
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

                <ListItemButton onClick={() => history.goBack()} >
                    <ListItemIcon>
                        <ArrowBackIcon />  
                    </ListItemIcon>
                <ListItemText primary="Voltar" />
            </ListItemButton>

            </React.Fragment>
        );  
        
    if(section === 'pages')
    return (
        <React.Fragment>

            <ListItemButton component={Link} to="/admin/pages/all" selected={activeMenu(context,'all')} >
                <ListItemIcon>
                    <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Ver Todas" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/pages/create" selected={activeMenu(context,'create')} >
                <ListItemIcon>
                    <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Criar" />
            </ListItemButton>            

            <ListItemButton onClick={() => history.goBack()} >
                <ListItemIcon>
                    <ArrowBackIcon />  
                </ListItemIcon>
                <ListItemText primary="Voltar" />
            </ListItemButton>

        </React.Fragment>
    );   

};

export default MainMenu;