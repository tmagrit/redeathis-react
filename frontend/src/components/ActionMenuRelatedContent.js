import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DefaultDialog from './DefaultDialog';
import ImageEdit from './ImageEdit';
//import AuthorEdit from './AuthorEdit';

const ActionMenuRelatedContent = (props) => {

    const { section, row } = props;

    // ACTION MENU STATES
    const [anchorActionEl, setAnchorActionEl] = useState(null);
    const [open, setOpen] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [image, setImage] = useState(null);

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = (image) => {
        setImage(image);
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };  

    // HANDLE CLICK ON ARTICLE EDIT
    const handleArticleClick = () => {
        handleDialogOpen(row); 
        handleClose();
    };
    
    // HANDLE ACTION MENU
    const handleMenu = (event) => {
        setAnchorActionEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorActionEl(null);
    };

    const handleDelete = (row) => {
        setAnchorActionEl(null);
    };

    // VIEW PATH
    const viewPath = (section) => {
        if(section === 'content') {
            const path = `/content/${row.id}`;
            return path;
        } if(section === 'contentvideos') {
            const path = `/admin/contentvideos/${row.video_id}`;
            return path;
        } if(section === 'pages') {
            const path = `/page/${row.id}`;
            return path;
        } else
            return '#';     
    }; 

    // EDIT PATH
    const editPath = (section) => {
        if(section === 'content' || section === 'sections' || section === 'pages' ) {
            const path = `/admin/${section}/edit/${row.id}`;
            return path;
        } if(section === 'contentvideos') {
            const path = '#';
            return path;
        } else
            return '#';     
    };    

    return (
        <React.Fragment>
            <IconButton 
                id="action-button" 
                aria-label="ações" 
                size="small" 
                onClick={handleMenu} 
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <MoreVertIcon fontSize="small" />
            </IconButton>

            <Menu
                id="action-menu"
                anchorEl={anchorActionEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorActionEl)}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'action-button',
                }}
            >




                <MenuList dense>
                    {section !== 'contentarticles' ? (
                    <MenuItem component={Link} to={viewPath(section)} onClick={handleClose} >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" color="info"/> 
                        </ListItemIcon>
                        Ver no Site
                    </MenuItem>
                    ) : null} 
                        <MenuItem component={Link} to={editPath(section)} onClick={handleArticleClick} >
                            <ListItemIcon>
                                <EditIcon fontSize="small" color="warning"/> 
                            </ListItemIcon>
                            Editar
                        </MenuItem> 
                </MenuList>


                <DefaultDialog
                    fullWidth={true}
                    maxWidth={'lg'}
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    title={'Editar Item'}
                    children={<ImageEdit image={image} onDelete={() => setDialogOpen(false)} />} 
                />

                {/* <MenuList dense>
                    {section !== 'contentarticles' ? (
                    <MenuItem component={Link} to={viewPath(section)} onClick={handleClose} >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" color="info"/> 
                        </ListItemIcon>
                        Ver no Site
                    </MenuItem>
                    ) : null} 
                        <MenuItem component={Link} to={editPath(section)} onClick={handleClose} >
                            <ListItemIcon>
                                <EditIcon fontSize="small" color="warning"/> 
                            </ListItemIcon>
                            Editar
                        </MenuItem> 
                    <Divider />
                    <MenuItem component={Link} to="#" onClick={() => handleDelete(row)} >
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error"/> 
                        </ListItemIcon>
                        Excluir
                    </MenuItem> 
                </MenuList> */}
            </Menu>
        </React.Fragment>
    );
};

export default ActionMenuRelatedContent;

ActionMenuRelatedContent.defaultProps = {
    section: 'contentarticles',
}

ActionMenuRelatedContent.propTypes = {
    row: PropTypes.object.isRequired,
    section: PropTypes.string.isRequired,
};

