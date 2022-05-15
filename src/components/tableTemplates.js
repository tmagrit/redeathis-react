import * as React from 'react';
import { DateTime } from 'luxon';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProfileActive } from '../features/membersSlice';
import Chip from '@mui/material/Chip';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

import ActionMenu from './ActionMenu';
import { Typography } from '@mui/material';


export function useTableTemplates(props) {

    //const { action } = props

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);

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
                selector: row => row.title,
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
                selector: row => 'date' ,
                sortable: true,
                maxWidth: '120px',
                grow: 1,
            },
            {
                name: 'Categoria',
                selector: row => row.category_id,
                cell: row => <Chip 
                                    label={categories.find(c => c.id === row.category_id).name} 
                                    size="small" 
                                    variant="outlined" 
                                />,
                sortable: true,
                maxWidth: '200px',
                grow: 1,
            },
            {
                name: 'Status',
                selector: row => row.status,
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
                selector: row => row.active,
                cell: row => <Chip 
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
                maxWidth: '100px',
                cell: row => <ActionMenu section={'members'} row={row} />,
                right: true,
                grow: 1,
            },
        ]
    );

    // COLUMNS TO AUTHORS LIST
    const authorsColumns = (
        [
            {
                name: 'ID',
                selector: row => row.id ,
                sortable: true,
                width: '70px',
            },
            {
                name: 'Nome',
                selector: row => row.name + ' ' + row.surname ,
                sortable: true,
                grow: 3,
            },
            {
                name: 'Nascimento',
                selector: row => row.has_birth ? DateTime.fromObject(row.birth).setLocale('pt-br').toFormat('dd/MM/yyyy') : 'sem registro',
                cell: row => row.has_birth ? DateTime.fromObject(row.birth).setLocale('pt-br').toFormat('dd/MM/yyyy') : <Typography variant="caption" sx={{ fontStyle: 'italic', }} >sem registro</Typography>,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Morte',
                selector: row => row.has_death ? DateTime.fromObject(row.death).setLocale('pt-br').toFormat('dd/MM/yyyy') : 'sem registro',
                cell: row => row.has_death ? DateTime.fromObject(row.death).setLocale('pt-br').toFormat('dd/MM/yyyy') : <Typography variant="caption" sx={{ fontStyle: 'italic', }} >sem registro</Typography>,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Ações',
                maxWidth: '100px',
                cell: row => <ActionMenu section={'authors'} row={row} />,
                right: true,
                grow: 1,
            },
        ]
    );

    return {
        fullProfilesColumns: fullProfilesColumns,
        fullResearchColumns: fullResearchColumns,
        authorsColumns: authorsColumns,
    };
};


