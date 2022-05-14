import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addResearchAuthor, deleteResearchAuthor, removeAuthor } from '../features/researchSlice';
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

const ActionAuthorMenu = (props) => {

    const { section, researchAuthor, authorAction, row } = props;

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const allResearchAuthors = useSelector(state => state.research.researchAuthors);
    const addResearchAuthorStatus = useSelector(state => state.research.addResearchAuthorStatus);
    const researchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) ));
    const researchAuthorsIds = researchAuthors.map(ra => {return ra.author_id});

    // ACTION MENU STATES
    const [anchorActionEl, setAnchorActionEl] = useState(null);
    //const [open, setOpen] = useState(true);

    // HANDLE ACTION MENU
    const handleMenu = (event) => {
        setAnchorActionEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorActionEl(null);
    };

    // HANDLE RELATE ACTIONS ENABLING
    const isRelatable = (row) => {
        if(researchAuthorsIds.includes(row.id))
            return false;
        else
            return true;
    };

    // HANDLE RELATE SOURCE
    const handleRelate = (row) => {
        dispatch(addResearchAuthor({ author_id: row.id, research_id: parseInt(params.researchId, 10) }));
        handleClose();
        authorAction();
    };

    // HANDLE UNRELATE SOURCE
    const handleUnrelate = () => {
        dispatch(removeAuthor(researchAuthor));
        dispatch(deleteResearchAuthor(researchAuthor));
        authorAction();
        handleClose();
    };

    // TRACK SOURCE CHANGES 
    useEffect(() => {
        authorAction();
    }, [allResearchAuthors, addResearchAuthorStatus, authorAction]);

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

export default ActionAuthorMenu;

ActionAuthorMenu.defaultProps = {
    section: 'research',
}

ActionAuthorMenu.propTypes = {
    researchAuthor: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
    section: PropTypes.string.isRequired,
    authorAction: PropTypes.func.isRequired,
};