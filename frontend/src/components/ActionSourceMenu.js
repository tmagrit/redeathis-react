import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSource, deleteSource, removeSource, selectResearchRelations } from '../features/researchSlice';
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

    const { section, source, row } = props; console.log('source',source); console.log('row',row);

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const dispatch = useDispatch();

    const researchRelations = useSelector(selectResearchRelations); //console.log('researchRelations',researchRelations);

    // const researchSources = useSelector(state => state.research.sources.filter(s => s.target_id === parseInt(params.researchId, 10) )); console.log('researchSources',researchSources);
    const researchSources = researchRelations.find(rr => rr.id === parseInt(params.researchId, 10) ); //console.log('researchSources2',researchSources);
    
    // const researchSourcesIds = researchSources.map(rs => {return rs.source_id}); console.log('researchSourcesIds',researchSourcesIds);
    const researchSourcesIds = researchSources.relations?.map(rsr => {return rsr.id}) ?? []; //console.log('researchSourcesIds2',researchSourcesIds);

    // ACTION MENU STATES
    const [anchorActionEl, setAnchorActionEl] = useState(null);

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
        if (row.id > parseInt(params.researchId, 10)) {
            const newSource = { source_id: parseInt(params.researchId, 10), target_id: row.id };
            dispatch(addSource(newSource));
        }
            
        else {
            const newSource = { source_id: row.id, target_id: parseInt(params.researchId, 10) }
            dispatch(addSource(newSource));
        };
            
        // dispatch(addSource({ source_id: row.id, target_id: parseInt(params.researchId, 10) }));
        handleClose();
    };

    // HANDLE UNRELATE SOURCE
    const handleUnrelate = () => {
        if (row.id > parseInt(params.researchId, 10)) {
            const oldSource = { source_id: parseInt(params.researchId, 10), target_id: row.id };
            dispatch(removeSource(oldSource));
            dispatch(deleteSource(oldSource));
        }
            
        else {
            const oldSource = { source_id: row.id, target_id: parseInt(params.researchId, 10) }
            dispatch(removeSource(oldSource));
            dispatch(deleteSource(oldSource));
        };

        // dispatch(removeSource(source));
        // dispatch(deleteSource(source));

        handleClose();
    };

    return (
        <React.Fragment>
            <IconButton 
                id="action-button"  
                size="small" 
                onClick={handleMenu} 
                // aria-label="ações"
                // aria-controls={open ? 'basic-menu' : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
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
                    <MenuItem component={Link} to={`/admin/view/research/${source.relatedResearch.id}`} onClick={handleClose} >
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
};