import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import DefaultDialog from './DefaultDialog';
import Invite from './Invite';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewListIcon from '@mui/icons-material/ViewList';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// MY HISTORY HOOK
import { useHistory } from './history';

const MainMenu = () => {

    // REDUX SELECTORS
    // const dispatch = useDispatch()
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
                <ListItemText primary="Gerir Pesquisa" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/research/create" selected={activeMenu(context,'create')} >
                <ListItemIcon>
                    <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Criar Nova" />
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
            <React.Fragment>

                <ListItemButton component={Link} to="/admin/categories/all" selected={activeMenu(context,'all')} >
                    <ListItemIcon>
                        <ViewListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gerir Categorias" />
                </ListItemButton>

                <ListItemButton component={Link} to="/admin/categories/create" selected={activeMenu(context,'create')} >
                    <ListItemIcon>
                        <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Criar Nova Categoria" />
                </ListItemButton>   

                <ListItemButton component={Link} to="/admin/categories/tags" selected={activeMenu(context,'alltags')} >
                    <ListItemIcon>
                        <BookmarksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gerir Marcadores" />
                </ListItemButton>     

                <ListItemButton component={Link} to="/admin/categories/createtag" selected={activeMenu(context,'createtag')} >
                    <ListItemIcon>
                        <BookmarkAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Criar Novo Marcador" />
                </ListItemButton>     

                <ListItemButton onClick={() => history.goBack()} >
                    <ListItemIcon>
                        <ArrowBackIcon />  
                    </ListItemIcon>
                    <ListItemText primary="Voltar" />
                </ListItemButton>

            </React.Fragment>
        );    
    
    if(section === 'members')
        return (
            <React.Fragment>

                <ListItemButton component={Link} to="/admin/members/all" selected={activeMenu(context,'all')} >
                    <ListItemIcon>
                        <ViewListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gerir Colaboradores" />
                </ListItemButton>

                <ListItemButton >
                    <ListItemIcon>
                        <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Convidar Colaborador" onClick={handleDialogOpen}/>
                </ListItemButton>

                {/* INVITE DIALOG */}
                <DefaultDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    title={'Convidar Colaborador'}
                    children={<Invite/>}
                />

                <ListItemButton component={Link} to="/admin/members/groups" selected={activeMenu(context,'allgroups')} >
                    <ListItemIcon>
                        <GroupWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gerir Grupos" />
                </ListItemButton>

                <ListItemButton component={Link} to="/admin/members/creategroup" selected={activeMenu(context,'creategroup')} >
                    <ListItemIcon>
                        <EditLocationAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Criar Novo Grupo" />
                </ListItemButton>

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
                    <ListItemText primary="Gerir Páginas" />
                </ListItemButton>

                <ListItemButton component={Link} to="/admin/pages/create" selected={activeMenu(context,'create')} >
                    <ListItemIcon>
                        <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Criar Nova" />
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