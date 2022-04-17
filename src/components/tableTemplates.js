import * as React from 'react';
import { DateTime } from "luxon";
import Chip from '@mui/material/Chip';

// COLUMNS TO MEMBERS LIST
export const profilesColumns = (

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
            selector: row => <Chip label={row.active ? 'Ativo' : 'Inativo'} size="small" variant="outlined" color={row.active ? 'success' : 'error'}/>,
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
    ]
);