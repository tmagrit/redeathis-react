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
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import ClearIcon from '@mui/icons-material/Clear';

const ActionMenu = ({ section, row, mode }) => {

    // ACTION MENU STATES
    const [anchorActionEl, setAnchorActionEl] = useState(null);
    const [open, setOpen] = useState(true);

    // HANDLE ACTION MENU
    const handleMenu = (event) => {
        setAnchorActionEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorActionEl(null);
    };

    const menuList = (mode) => {
        if(mode === 'sources') {
            return (
                <MenuList dense>
                    <MenuItem onClick={undefined} >
                        <ListItemIcon>
                            <MultipleStopIcon fontSize="small" color="success"/> 
                        </ListItemIcon>
                        Relacionar
                    </MenuItem> 
                </MenuList>
            );
        }if(mode === 'editsources') {
            return (
                <MenuList dense>
                    <MenuItem component={Link} to="#" onClick={handleClose} >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" color="info"/> 
                        </ListItemIcon>
                        Pré Visualizar
                    </MenuItem> 
                    <MenuItem onClick={undefined} >
                        <ListItemIcon>
                            <ClearIcon fontSize="small" color="error"/> 
                        </ListItemIcon>
                        Excluir Vínculo
                    </MenuItem> 
                </MenuList>
            );
        } else {
            return (
                <MenuList dense>
                    <MenuItem component={Link} to="#" onClick={handleClose} >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" color="info"/> 
                        </ListItemIcon>
                        Pré Visualizar
                    </MenuItem> 
                    <MenuItem component={Link} to={`/admin/${section}/edit/${row.id}`} onClick={handleClose} >
                        <ListItemIcon>
                            <EditIcon fontSize="small"  color="warning"/> 
                        </ListItemIcon>
                        Editar
                    </MenuItem> 
                    <Divider />
                    <MenuItem component={Link} to="#" onClick={handleClose} >
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error"/> 
                        </ListItemIcon>
                        Excluir
                    </MenuItem> 
                </MenuList>
            );
        }
    }

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
                {menuList(mode)}
            </Menu>

        </React.Fragment>
    );
};

export default ActionMenu;

ActionMenu.defaultProps = {
    mode: 'default',
}

ActionMenu.propTypes = {
    row: PropTypes.object.isRequired,
    section: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
};