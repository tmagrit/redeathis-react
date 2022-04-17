import * as React from 'react';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { toggleProfileActive } from '../features/membersSlice';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

export function useTableTemplates() {

   // REDUX SELECTORS
   const dispatch = useDispatch();

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
                sortable: true,
                grow: 1,
            },
            {
                name: 'Última Atualização',
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
                selector: row => <IconButton aria-label="editar" size="small" color="primary">
                                    <EditIcon fontSize="small" />
                                </IconButton>,
                right: true,
                grow: 1,
            },
        ]
    );

  

  
    return {
        fullProfilesColumns: fullProfilesColumns,
        // go: navigate,
        // goBack: () => navigate(-1),
        // goForward: () => navigate(1),
        // pathArray,
        // location,
    };
};


