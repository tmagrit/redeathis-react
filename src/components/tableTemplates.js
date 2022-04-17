import * as React from 'react';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { toggleProfileActive } from '../features/membersSlice';
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
            },
            {
                name: 'Grupo',
                selector: row => row.organization.name,
                sortable: true,
            },
            {
                name: 'Responsabilidade',
                selector: row => row.role.name ,
                sortable: true,
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
            },
            {
                name: 'Última Atualização',
                selector: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('dd/MM/yyyy'),
                sortable: true,
            },
            {
                name: 'Colaborador Desde',
                selector: row => DateTime.fromISO(row.created_at).setLocale('pt-br').toFormat('dd/MM/yyyy'),
                sortable: true,
            },
            {
                name: 'Ações',
                selector: row => <Button size="small" variant="text">Editar</Button>,
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


