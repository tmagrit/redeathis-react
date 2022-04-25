import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import LayersIcon from '@mui/icons-material/Layers';

const MainMenu = () => {
    
    // REDUX SELECTORS
    const section = useSelector(state => state.session.section)

    function activeMenu(section, link) {
        if(section === link)
            return true;
        else
            return false;
    };

    return (
        <div>
            <ListItemButton component={Link} to="/admin/research" selected={activeMenu(section,'research')} >
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
