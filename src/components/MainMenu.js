import * as React from 'react';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import LayersIcon from '@mui/icons-material/Layers';

const MainMenu = ({ section }) => {

    function activeMenu(section, link) {
        if(section === link)
            return true;
        else
            return false;
    };

    return (
        <React.Fragment>

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

            {/* <ListItemButton component={Link} to="/admin/tags" selected={activeMenu(section,'tags')} >
                <ListItemIcon>
                    <BookmarksIcon />
                </ListItemIcon>
                <ListItemText primary="Marcadores" />
            </ListItemButton> */}

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

        </React.Fragment>
    )
};

export default MainMenu;