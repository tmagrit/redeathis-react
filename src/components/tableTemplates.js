import * as React from 'react';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { toggleProfileActive } from '../features/membersSlice';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';

import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { Typography } from '@mui/material';

import ActionMenu from './ActionMenu';

export function useTableTemplates() {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);

    // // ACTION MENU STATES
    // const [anchorActionEl, setAnchorActionEl] = useState(null);
    // const [open, setOpen] = useState(true);

    // // HANDLE ACTION MENU
    // const handleMenu = (event) => {
    //     setAnchorActionEl(event.currentTarget);
    //     console.log('event.currentTarget', event.currentTarget)
    // };
    // const handleClose = () => {
    //     setAnchorActionEl(null);
    // };

    function statusColor(id) {
        if(id === 1)
            return 'success';
        if(id === 2)
            return 'primary'
        if(id === 3)
            return 'warning'
        if(id === 4)
            return 'error'    
    }

    // const ActionMenu = ({section , row}) => (
    //     <React.Fragment>
    //         <IconButton 
    //             id="action-button" 
    //             aria-label="ações" 
    //             size="small" 
    //             onClick={handleMenu} 
    //             aria-controls={open ? 'basic-menu' : undefined}
    //             aria-haspopup="true"
    //             aria-expanded={open ? 'true' : undefined}
    //         >
    //             <MoreVertIcon fontSize="small" />
    //         </IconButton>

    //         <Menu
    //             id="action-menu"
    //             anchorEl={anchorActionEl}
    //             anchorOrigin={{
    //                 vertical: 'bottom',
    //                 horizontal: 'right',
    //             }}
    //             keepMounted
    //             transformOrigin={{
    //                 vertical: 'bottom',
    //                 horizontal: 'left',
    //             }}
    //             open={Boolean(anchorActionEl)}
    //             onClose={handleClose}
    //             MenuListProps={{
    //                 'aria-labelledby': 'action-button',
    //             }}
    //         >
    //             <MenuList dense>
    //                 <MenuItem component={Link} to="#" onClick={handleClose} >
    //                     <ListItemIcon>
    //                         <VisibilityIcon fontSize="small" color="info"/> 
    //                     </ListItemIcon>
    //                     Pré Visualizar
    //                 </MenuItem> 
    //                 <MenuItem component={Link} to={`/admin/${section}/edit/${row.id}`} onClick={handleClose} >
    //                     <ListItemIcon>
    //                         <EditIcon fontSize="small"  color="warning"/> 
    //                     </ListItemIcon>
    //                     Editar
    //                 </MenuItem> 
    //                 <Divider />
    //                 <MenuItem component={Link} to="#" onClick={handleClose} >
    //                     <ListItemIcon>
    //                         <DeleteIcon fontSize="small" color="error"/> 
    //                     </ListItemIcon>
    //                     Excluir
    //                 </MenuItem> 
    //             </MenuList>    
    //         </Menu>
    //     </React.Fragment>
    // );        

    // COLUMNS TO RESEARCH LIST
    const fullResearchColumns = (
        [
            {
                name: 'Id',
                selector: row => row.id ,
                omit: true,
            },
            {
                name: 'Título',
                //selector: row => row.title ,
                selector: 'title',
                cell: row => <span style={{ wordBreak: "break-word" }}>{row.title}</span>, 
                sortable: true,
                //maxWidth: '220px',
                grow: 3,
            },
            {
                name: 'Resumo',
                // selector: row => row.summary,
                selector: row => row.summary,
                sortable: true,
                omit: true,
            },
            {
                name: 'Data',
                selector: row => row.date ,
                sortable: true,
                maxWidth: '120px',
                grow: 1,
            },
            {
                name: 'Categoria',
                selector: 'categorie_id',
                cell: row => <Chip 
                                    label={categories.find(c => c.id === row.category_id).name} 
                                    size="small" 
                                    variant="outlined" 
                                />,
                sortable: true,
                maxWidth: '180px',
                grow: 1,
            },
            {
                name: 'Status',
                selector: 'status',
                cell: row => <Chip 
                                    label={statuses.find(s => s.id === row.status).status} 
                                    size="small" 
                                    variant="outlined" 
                                    color={statusColor(row.status)}
                                />,
                sortable: true,
                maxWidth: '140px',
                grow: 1,
            },
            {
                name: 'Atualização',
                selector: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('dd/MM/yyyy'),
                sortable: true,
                maxWidth: '120px',
                grow: 1,
            },
            {
                name: 'Criação',
                selector: row => DateTime.fromISO(row.created_at).setLocale('pt-br').toFormat('dd/MM/yyyy'),
                sortable: true,
                omit: true,
                //grow: 0.1,
            },
            {
                name: 'Ações',
                maxWidth: '100px',
                cell: row => <ActionMenu section={'research'} row={row} />,
                right: true,
                grow: 1,
            },
        ]
    ); 

    // COLUMNS TO MEMBERS LIST
    const fullProfilesColumns = (
        [
            {
                name: 'Id',
                selector: row => row.ind ,
                omit: true,
            },
            {
                name: 'Avatar URL',
                selector: row => row.avatar_url ,
                omit: true,
            },
            {
                name: 'Nome',
                selector: row => row.name + ' ' + row.surname ,
                sortable: true,
                grow: 3,
            },
            {
                name: 'Grupo',
                selector: row => row.organization.name,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Responsabilidade',
                selector: row => row.role.name ,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Situação',
                selector: row => <Chip 
                                    clickable 
                                    icon={row.active ? <ToggleOnIcon /> : <ToggleOffIcon />} 
                                    label={row.active ? 'Ativo' : 'Inativo'} 
                                    size="small" 
                                    variant="outlined" 
                                    color={row.active ? 'success' : 'error'}
                                    onClick={() => dispatch(toggleProfileActive({ ind: row.ind, active: row.active }))}
                                />,
                //sortable: true,
                grow: 1,
            },
            {
                name: 'Atualização',
                selector: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('dd/MM/yyyy'),
                sortable: true,
                grow: 2,
            },
            {
                name: 'Ingresso',
                selector: row => DateTime.fromISO(row.created_at).setLocale('pt-br').toFormat('dd/MM/yyyy'),
                sortable: true,
                grow: 1,
            },
            {
                name: 'Ações',
                selector: row => <React.Fragment>
                                    <IconButton aria-label="editar" size="small" color="info">
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton aria-label="editar" size="small" color="warning" edge="end">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>,
                right: true,
                grow: 1,
            },
        ]
    );

  

  
    return {
        fullProfilesColumns: fullProfilesColumns,
        fullResearchColumns: fullResearchColumns,
        // goBack: () => navigate(-1),
        // goForward: () => navigate(1),
        // pathArray,
        // location,
    };
};


