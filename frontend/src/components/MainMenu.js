import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';


// import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BadgeIcon from '@mui/icons-material/Badge';

import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
//import ArticleIcon from '@mui/icons-material/Article';
import LayersIcon from '@mui/icons-material/Layers';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import ViewListIcon from '@mui/icons-material/ViewList';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
// import BookmarksIcon from '@mui/icons-material/Bookmarks';
// import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContactsIcon from '@mui/icons-material/Contacts';

import { useHistory } from './history';

import DefaultDialog from './DefaultDialog';
import Invite from './Invite';

const MainMenu = () => {

    // REDUX SELECTORS
    const drawerState = useSelector(state => state.session.drawerState);

    // MY HISTORY HOOK
    const history = useHistory();
    const section = history?.pathArray[1] || ''
    const context = history?.pathArray[2] || ''

    // TRACK ROUTES 
    useEffect(() => {
    }, [history.location]);

    // DIALOG STATES 
    const [dialogOpen, setDialogOpen] = useState(false);

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = (value) => {
        setDialogOpen(false);
    };

    function activeMenu(section, link) {
        if(section === link)
            return true;
        else
            return false;
    };

    return (
        <Fragment>
            <List 
                component="nav"
                aria-labelledby="acervo"
                subheader={
                    <ListSubheader component="div" id="acervo">
                        <Box color={drawerState ? 'inherit' : 'background.paper'} >
                            Acervo
                        </Box>
                    </ListSubheader>
                }
            >
                {/* REFERÊNCIAS  */}
                <ListItemButton component={Link} to="/admin/research" selected={activeMenu(history?.pathArray[2],'research')} >
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Referências" />
                </ListItemButton>

                <Collapse in={section === 'research'} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ bgcolor: 'action.selected' }}>
                        {/* <ListItemButton component={Link} to="/admin/research/all" selected={activeMenu(context,'all')} >
                            <ListItemIcon>
                                <ViewListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Referências" />
                        </ListItemButton> */}

                        <ListItemButton component={Link} to="/admin/research/create" selected={activeMenu(context,'create')} >
                            <ListItemIcon>
                                <AddCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nova Referência" />
                        </ListItemButton>

                    </List>
                </Collapse>


                <ListItemButton component={Link} to="/admin/authors" selected={activeMenu(section,'authors')}>
                    <ListItemIcon>
                        <ContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Autores" />
                </ListItemButton>  

                <ListItemButton component={Link} to="/admin/categories" selected={activeMenu(section,'categories')} >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categorias" />
                </ListItemButton>
                </List>

                <Divider  />

                {/* INSTITUCIONAL  */}
                <List 
                    component="nav"
                    aria-labelledby="institucional"
                    subheader={
                        <ListSubheader component="div" id="institucional">
                            <Box color={drawerState ? 'inherit' : 'background.paper'} >
                                Institucional
                            </Box>
                        </ListSubheader>
                    }
                >
                    <ListItemButton component={Link} to="/admin/members" selected={activeMenu(section,'members')} >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Colaboradores" />
                    </ListItemButton>

                    <Collapse in={section === 'members'} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ bgcolor: 'action.selected' }}>

                            {/* <ListItemButton component={Link} to="/admin/members/all" selected={activeMenu(context,'all')} >
                                <ListItemIcon>
                                    <ViewListIcon />
                                </ListItemIcon>
                                <ListItemText primary="Colaboradores" />
                            </ListItemButton> */}

                            <ListItemButton >
                                <ListItemIcon>
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Novo Colaborador" onClick={handleDialogOpen}/>
                            </ListItemButton>

                            {/* INVITE MEMBER DIALOG */}
                            <DefaultDialog
                                open={dialogOpen}
                                onClose={handleDialogClose}
                                title={'Convidar Colaborador'}
                                children={<Invite/>}
                            />

                        </List>
                    </Collapse>

                    <ListItemButton component={Link} to="/admin/groups" selected={activeMenu(section,'groups')} >
                        <ListItemIcon>
                            <GroupWorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Grupos" />
                    </ListItemButton>

                    <Collapse in={section === 'groups'} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ bgcolor: 'action.selected' }}>

                            <ListItemButton component={Link} to="/admin/groups/create" selected={activeMenu(context,'create')} >
                                <ListItemIcon>
                                    <EditLocationAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="Novo Grupo" />
                            </ListItemButton>

                            {/* NEW GROUP DIALOG 
                            <DefaultDialog
                                open={dialogOpen}
                                onClose={handleDialogClose}
                                title={'Convidar Colaborador'}
                                children={<Invite/>}
                            /> */}

                        </List>
                    </Collapse>

                    <Collapse in={section === 'pages'} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ bgcolor: 'action.selected' }}>

                            <ListItemButton component={Link} to="/admin/pages/create" selected={activeMenu(context,'create')} >
                                <ListItemIcon>
                                    <AddCircleOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="Nova Seção" />
                            </ListItemButton>   

                        </List>
                    </Collapse>
                </List>

                <Divider />

                {/* PÁGINAS  */}
                <List 
                    component="nav"
                    aria-labelledby="Páginas"
                    subheader={
                        <ListSubheader component="div" id="paginas">
                            <Box color={drawerState ? 'inherit' : 'background.paper'} >
                                Páginas
                            </Box>
                        </ListSubheader>
                    }
                >

                    <ListItemButton component={Link} to="/admin/pages/edit/apresentacao" selected={activeMenu(section,'pages')} >
                        <ListItemIcon>
                            <DriveFileRenameOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Apresentação" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/admin/pages/edit/quemsomos" selected={activeMenu(section,'pages')} >
                        <ListItemIcon>
                            <BadgeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quem Somos" />
                    </ListItemButton>

                </List>

                <Divider />

                {/* BACK BUTTON  */}
                <ListItemButton onClick={() => history.goBack()} >
                    <ListItemIcon>
                        <ArrowBackIcon />  
                    </ListItemIcon>
                    <ListItemText primary="Voltar" />
                </ListItemButton>

            </Fragment>


    )
};

export default MainMenu;
