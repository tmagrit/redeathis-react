import * as React from 'react';
import { DateTime } from 'luxon';
import { useSelector, useDispatch } from 'react-redux';
//import { toggleProfileActive } from '../features/membersSlice';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
//import Chip from '@mui/material/Chip';
//import ToggleOffIcon from '@mui/icons-material/ToggleOff';
//import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Typography from '@mui/material/Typography';

import ActionMenu from './ActionMenu';
import { truncate } from './truncate';

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
    };

    function statusColorName(id) {
        if(id === 1)
            return 'success.main';
        if(id === 2)
            return 'text.disabled';
        if(id === 3)
            return 'warning.main'
        else
            return 'error.main';  
    };

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
                cell: row => <span style={{ wordBreak: "break-word" }}>{truncate(row.title, 5)}</span>, 
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
                name: 'Cronologia',
                selector: row => row.date.start.year,
                cell: row => row.date.interval ? `${row.date.start.year}-${row.date.end.year}` : row.date.start.year,
                sortable: true,
                maxWidth: '120px',
                grow: 1,
            },
            {
                name: 'Categoria',
                //selector: row => row.category_id, categories.find(c => c.id === row.category_id).name
                selector: row => categories.find(c => c.id === row.category_id).name, 
                cell: row => <Stack direction="row"  alignItems="center" spacing={0.7}  >
                                <Avatar sx={{ width: 10, height: 10, bgcolor: `${categories.find(c => c.id === row.category_id).color}` }}> </Avatar>
                                <Typography variant="caption" > {categories.find(c => c.id === row.category_id).name} </Typography>
                            </Stack>,
                sortable: true,
                maxWidth: '200px',
                grow: 1,
            },
            {
                name: 'Status',
                selector: row => statuses.find(s => s.id === row.status).status,
                cell: row => <Box sx={{ color: statusColorName(row.status) }} >
                                    {statuses.find(s => s.id === row.status).status} 
                                </Box>,
                sortable: true,
                maxWidth: '140px',
                grow: 2,
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
                selector: row => row.active ? 'Ativo' : 'Inativo',

                cell: row => <Box sx={{ color: row.active ? 'success.main' : 'error.main' }} >
                                    {row.active ? 'Ativo' : 'Inativo'}  
                                </Box>,
                // cell: row => <Chip 
                //                     clickable 
                //                     icon={row.active ? <ToggleOnIcon /> : <ToggleOffIcon />} 
                //                     label={row.active ? 'Ativo' : 'Inativo'} 
                //                     size="small" 
                //                     variant="outlined" 
                //                     color={row.active ? 'success' : 'error'}
                //                     onClick={() => dispatch(toggleProfileActive({ ind: row.ind, active: row.active }))}
                //                 />,
                sortable: true,
                grow: 1,
            },
            {
                name: 'Atualização',
                selector: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('dd/MM/yyyy').toString(),
                sortable: true,
                grow: 2,
            },
            {
                name: 'Ingresso',
                selector: row => DateTime.fromISO(row.created_at).setLocale('pt-br').toFormat('dd/MM/yyyy').toString(),
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
            // {
            //     name: 'Nascimento',
            //     selector: row => row.has_birth ? DateTime.fromObject(row.birth).setLocale('pt-br').toFormat('dd/MM/yyyy').toString() : 'sem registro',
            //     cell: row => row.has_birth ? DateTime.fromObject(row.birth).setLocale('pt-br').toFormat('dd/MM/yyyy').toString() : <Typography variant="caption" sx={{ fontStyle: 'italic', }} >sem registro</Typography>,
            //     omit: true,
            //     sortable: true,
            //     grow: 2,
            // },
            // {
            //     name: 'Morte',
            //     selector: row => row.has_death ? DateTime.fromObject(row.death).setLocale('pt-br').toFormat('dd/MM/yyyy') : 'sem registro',
            //     cell: row => row.has_death ? DateTime.fromObject(row.death).setLocale('pt-br').toFormat('dd/MM/yyyy') : <Typography variant="caption" sx={{ fontStyle: 'italic', }} >sem registro</Typography>,
            //     omit: true,
            //     sortable: true,
            //     grow: 2,
            // },
            {
                name: 'Ações',
                maxWidth: '100px',
                cell: row => <ActionMenu section={'authors'} row={row} />,
                right: true,
                grow: 1,
            },
        ]
    );

    // COLUMNS TO PAGES LIST
    const pagesColumns = (
        [
            {
                name: 'ID',
                selector: row => row.id ,
                sortable: true,
                omit: true,
                width: '70px',
            },
            {
                name: 'Menu',
                selector: row => row.slug ,
                sortable: true,
                grow: 1,
            },
            {
                name: 'Título',
                selector: row => row.title ,
                sortable: true,
                grow: 3,
            },
            {
                name: 'Atualização',
                selector: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('dd/MM/yyyy'),
                sortable: true,
                grow: 2,
            },
            {
                name: 'Status',
                selector: row => row.status,
                cell: row => <Box sx={{ color: statusColorName(row.status) }} >
                                    {statuses.find(s => s.id === row.status).status} 
                                </Box>,
                sortable: true,
                maxWidth: '140px',
                grow: 2,
            },
            // {
            //     name: 'Status',
            //     selector: row => row.status,
            //     cell: row => <Chip 
            //                         label={statuses.find(s => s.id === row.status).status} 
            //                         size="small" 
            //                         variant="outlined" 
            //                         color={statusColor(row.status)}
            //                     />,
            //     sortable: true,
            //     maxWidth: '140px',
            //     grow: 1,
            // },
            {
                name: 'Ações',
                maxWidth: '100px',
                cell: row => <ActionMenu section={'pages'} row={row} />,
                right: true,
                grow: 1,
            },
        ]
    );   

    return {
        fullProfilesColumns: fullProfilesColumns,
        fullResearchColumns: fullResearchColumns,
        authorsColumns: authorsColumns,
        pagesColumns: pagesColumns,
    };
};


