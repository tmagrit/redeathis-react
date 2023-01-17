import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAuthor, deleteAuthor } from '../features/researchSlice';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

import AuthorEdit from './AuthorEdit';

const ActionMenu = (props) => {

    const { section, row } = props;

    // REDUX SELECTORS
    const dispatch = useDispatch();

    // ACTION MENU STATES
    const [anchorActionEl, setAnchorActionEl] = useState(null);
    const [authorEditDialogOpen, setAuthorEditDialogOpen] = useState(false);
    const [open, setOpen] = useState(true);

    // HANDLE ACTION MENU
    const handleMenu = (event) => {
        setAnchorActionEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorActionEl(null);
    };

    // HANDLE AUTHOR EDIT
    const handleAuthorEditClose = () => {
        setAuthorEditDialogOpen(false);
    };

    const handleEdit = (row) => {
        if(section === 'authors') {
            setAuthorEditDialogOpen(true);
            //dispatch(deleteAuthor(row));
        }
        setAnchorActionEl(null);
    };

    const handleDelete = (row) => {
        if(section === 'authors') {
            dispatch(deleteAuthor(row));
        }
        setAnchorActionEl(null);
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
                    <MenuItem component={Link} to={`/admin/view/${section}/${row.id}`} onClick={handleClose} >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" color="info"/> 
                        </ListItemIcon>
                        Ver
                    </MenuItem> 
                    {section === 'authors' ? (
                        <MenuItem onClick={handleEdit} >
                            <ListItemIcon>
                                <EditIcon fontSize="small"  color="warning"/> 
                            </ListItemIcon>
                            Editar
                        </MenuItem> 
                    ) : (
                        <MenuItem component={Link} to={`/admin/${section}/edit/${row.id}`} onClick={handleEdit} >
                            <ListItemIcon>
                                <EditIcon fontSize="small"  color="warning"/> 
                            </ListItemIcon>
                            Editar
                        </MenuItem> 
                    )}
                    <Divider />
                    <MenuItem component={Link} to="#" onClick={() => handleDelete(row)} >
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error"/> 
                        </ListItemIcon>
                        Excluir
                    </MenuItem> 
                </MenuList>
            </Menu>

            {/* CREATE SOURCE DIALOG */}
            <AuthorEdit
                open={authorEditDialogOpen}
                onClose={handleAuthorEditClose}
                row={row}
            />

        </React.Fragment>
    );
};

export default ActionMenu;

ActionMenu.defaultProps = {
    section: 'research',
}

ActionMenu.propTypes = {
    row: PropTypes.object.isRequired,
    section: PropTypes.string.isRequired,
};
