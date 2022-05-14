import * as React from 'react';
import { useState, useSyncExternalStore, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSource, deleteSource, removeSource } from '../features/researchSlice';
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import ClearIcon from '@mui/icons-material/Clear';

const ActionSourceMenu = (props) => {

    const { section, source, sourceAction, row } = props;

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const sources = useSelector(state => state.research.sources);
    const addSourceStatus = useSelector(state => state.research.addSourceStatus);
    const researchSources = useSelector(state => state.research.sources.filter(s => s.target_id === parseInt(params.researchId, 10) ));
    const researchSourcesIds = researchSources.map(rs => {return rs.source_id});

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

    // HANDLE RELATE ACTIONS ENABLING
    const isRelatable = (row) => {
        if(researchSourcesIds.includes(row.id))
            return false;
        else
            return true;
    };

    // HANDLE RELATE SOURCE
    const handleRelate = (row) => {
        dispatch(addSource({ source_id: row.id, target_id: parseInt(params.researchId, 10) }));
        handleClose();
    };

    // HANDLE UNRELATE SOURCE
    const handleUnrelate = () => {
        dispatch(removeSource(source));
        dispatch(deleteSource(source));
        sourceAction();
        handleClose();
    };

    // TRACK SOURCE CHANGES 
    useEffect(() => {
        sourceAction();
    }, [sources, addSourceStatus]);

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
                    <MenuItem component={Link} to={`/admin/${section}/view/${params.researchId}`} onClick={handleClose} >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" color="info"/> 
                        </ListItemIcon>
                        Ver
                    </MenuItem> 
                    <MenuItem onClick={() => handleRelate(row)} disabled={!isRelatable(row)}>
                        <ListItemIcon>
                            <MultipleStopIcon fontSize="small" color="success" /> 
                        </ListItemIcon>
                        Relacionar
                    </MenuItem> 
                    <MenuItem onClick={() => handleUnrelate(row)} disabled={isRelatable(row)}>
                        <ListItemIcon>
                            <ClearIcon fontSize="small" color="error"/> 
                        </ListItemIcon>
                        Desassociar
                    </MenuItem> 
                </MenuList>
            </Menu>

        </React.Fragment>
    );
};

export default ActionSourceMenu;

ActionSourceMenu.defaultProps = {
    section: 'research',
}

ActionSourceMenu.propTypes = {
    source: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
    section: PropTypes.string.isRequired,
    sourceAction: PropTypes.func.isRequired,
};