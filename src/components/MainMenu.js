import * as React from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import LayersIcon from '@mui/icons-material/Layers';
import { useHistory } from './history';

const MainMenu = () => {

    // MY HISTORY HOOK
    const history = useHistory();
    const section = history?.pathArray[2] || ''

    // TRACK ROUTES 
    useEffect(() => {
    }, [history.location]);

    function activeMenu(section, link) {
        if(section === link)
            return true;
        else
            return false;
    };

    return (
        <div>
            <ListItemButton component={Link} to="/admin/research" selected={activeMenu(history?.pathArray[2],'research')} >
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Pesquisa" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/categories" selected={activeMenu(section,'categories')} >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Categorias" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/members" selected={activeMenu(section,'members')} >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Colaboradores" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/pages" selected={activeMenu(section,'pages')} >
                <ListItemIcon>
                    <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Páginas" />
            </ListItemButton>
        </div>
    )
};

export default MainMenu;
