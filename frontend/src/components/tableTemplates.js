import * as React from 'react';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ActionMenu from './ActionMenu';
import ActionAuthorMenu from './ActionAuthorMenu';
import ActionSourceMenu from './ActionSourceMenu';
//import { truncate } from './truncate';

//IMAGE GALLERI ADD <--
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import ActionMenuRelatedContent from './ActionMenuRelatedContent'; 
import { getRelatedContentName, truncate } from '../utils';  
//IMAGE GALLERI ADD -->

export function useTableTemplates(props) {

    // IMAGEKIT
    const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT; 
    const imgSize = 50; 

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const dispatch = useDispatch();
    
    //IMAGE GALLERI ADD <--
    const content = useSelector(state => state.research.research);
    //const contentArticles = useSelector(state => state.content.content_articles);
    //IMAGE GALLERI ADD -->
    
    const sources = useSelector(state => state.research.sources);
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);
    // AUTHORS SELECTORS
    const allResearchAuthors = useSelector(state => state.research.researchAuthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) ));
 
    /////////////////////

    // RESEARCH AND AUTHORS STATES
    const [researchAuthors, setResearchAuthors] = useState([]);
    const [researchSources, setResearchSources] = useState([]);

    const handleUpdateResearchAuthors = (allresearchauthors) => {
        const updatedResearchAuthors = allresearchauthors.filter(ra => ra.research_id === parseInt(params.researchId, 10) );
        setResearchAuthors(updatedResearchAuthors);
    };

    const handleUpdateResearchSources = (sources) => {
        const updatedResearchSources = sources.filter(s => s.target_id === parseInt(params.researchId, 10) );
        setResearchSources(updatedResearchSources);
    };

    /////////////////////

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
                name: 'Ano',
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
            {
                name: 'Atualização',
                selector: row => row.updated_at,
                cell: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('yyyy-MM-dd'),
                sortable: true,
                right: true,
                grow: 2,
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
                maxWidth: '50px',
                cell: row => <ActionMenu section={'authors'} row={row} />,
                right: true,
                grow: 1,
            },
        ]
    );

    // COLUMNS TO AUTHOR ADD LIST
    const authorsSourcesColumns = (
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
                name: 'Atualização',
                selector: row => row.updated_at,
                cell: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('yyyy-MM-dd'),
                sortable: true,
                right: true,
                grow: 2,
            },
            {
                name: 'Ações',
                maxWidth: '100px',
                cell: row =>    <ActionAuthorMenu 
                                    section={'research'} 
                                    authorAction={() => handleUpdateResearchAuthors(allResearchAuthors)} 
                                    row={row} 
                                    researchAuthor={allResearchAuthors.find(ra => ra.author_id === row.id)} 
                                />,
                right: true,
                grow: 1,
            },
        ]
    );    

    // COLUMNS TO SOURCES LIST
    const researchSourcesColumns = (
        [
            {
                name: 'ID',
                selector: row => row.id ,
                sortable: true,
                width: '70px',
            },
            {
                name: 'Título',
                selector: row => row.title,
                cell: row => <span style={{ wordBreak: "break-word" }}>{row.title}</span>, 
                sortable: true,
                grow: 3,
            },
            {
                name: 'Resumo',
                selector: row => row.summary,
                sortable: true,
                omit: true,
            },

            {
                name: 'Ano',
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
                name: 'Ações',
                maxWidth: '100px',
                cell: row =>    <ActionSourceMenu 
                                    section={'research'} 
                                    sourceAction={() => handleUpdateResearchSources(sources)} 
                                    row={row} 
                                    source={researchSources.find(rs => rs.source_id === row.id)} 
                                />,
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













    // // COLUMNS TO VIDEO LIST
    // const contentArticlesColumns = (
    //     [
    //         {
    //             name: 'ID',
    //             selector: row => row.fileId ,
    //             sortable: true,
    //             omit: true,
    //             width: '70px',
    //         },
    //         {
    //             name: 'Título | Ano | Autor',
    //             selector: row => row.title + row.technique + row.date,
    //             //cell: row => <span style={{ wordBreak: "break-word" }}> {truncate(row.title, 15)} </span>,
    //             cell: (row) => (
    //                 <div style={{ paddingTop: "5px", paddingBottom: "5px", }}>
    //                     <div style={{ wordBreak: "break-word" }}>{`${truncate(row.title, 15)} [${row.date}]`}</div>
    //                     <div style={{ paddingTop: "3px", fontWeight: "bold" }}>{row.technique}</div>
    //                 </div>
    //             ),
    //             sortable: true,
    //             //maxWidth: '250px',
    //             grow: 3,
    //         },
    //         {
    //             name: 'Descrição',
    //             selector: row => row.description,
    //             cell: row => <span style={{ wordBreak: "break-word" }}> {truncate(row.description, 25)} </span>,
    //             sortable: true,
    //             //maxWidth: '200px',
    //             grow: 3,
    //         },  
    //         // {
    //         //     name: 'Ano',
    //         //     selector: row => row.date,
    //         //     cell: row => row.date,
    //         //     sortable: true,
    //         //     maxWidth: '100px',
    //         //     grow: 1,
    //         // },
    //         {
    //             name: 'Publicação Relacionada',
    //             selector: row => getRelatedContentName(content, contentArticles, row.fileId),
    //             cell: row => getRelatedContentName(content, contentArticles, row.fileId),
    //             sortable: true,
    //             //maxWidth: '140px',
    //             grow: 2,
    //         },
     
    //         // {
    //         //     name: 'Autor',
    //         //     selector: row => row.technique,
    //         //     //cell: row => <span style={{ wordBreak: "break-word" }}> {truncate(row.description, 25)} </span>,
    //         //     sortable: true,
    //         //     //maxWidth: '200px',
    //         //     grow: 2,
    //         // }, 
    //         {
    //             name: 'Categoria',
    //             selector: row => row.dimensions,
    //             sortable: true,
    //             //maxWidth: '200px',
    //             grow: 1,
    //         }, 
    //         // {
    //         //     name: 'YouTube',
    //         //     selector: row => row.video_id,
    //         //     cell: row => <IconButton color="info" aria-label="link para youtube" size="small" component={Link} target="_blank" rel="noopener" href={`https://www.youtube.com/watch?v=${row.video_id}`}>
    //         //             <LaunchIcon fontSize="inherit" /> 
    //         //         </IconButton>,
    //         //     sortable: true,
    //         //     maxWidth: '120px',
    //         //     grow: 2,
    //         // },
    //         // {
    //         //     name: 'Atualizado',
    //         //     selector: row => row.updated_at,
    //         //     cell: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('dd/MM/yyyy'),
    //         //     sortable: true,
    //         //     maxWidth: '120px',
    //         //     grow: 2,
    //         // },
    //         {
    //             name: 'Ações',
    //             maxWidth: '80px',
    //             cell: row => <ActionMenuRelatedContent section={'contentarticles'} row={row}/>,
    //             right: true,
    //             grow: 1,
    //         },
    //     ]
    // );     

    // MAIN TABLE FOR REDEATHIS IMAGE CONTENT. TODO: REVIEW TABLE CONTENT TO FIT IMAGES FROM ANOTHER CONTENT TYPES DIFFERENT FROM RESEARCH
    const researchImagesColumns = (
        [
            {
                name: 'ID',
                selector: row => row.fileId ,
                sortable: true,
                omit: true,
                width: '70px',
            },
            {
                name: "Imagem", 
                selector: row => row.url,
                sortable: true,
                reorder: true,
                cell: (row) => (
                    <div style={{ paddingTop: "3px", paddingBottom: "3px" }}>
                        <img 
                            style={{ borderStyle: "outset"}}
                            src={`${urlEndpoint}/tr:h-${imgSize},w-${imgSize}${row.filePath}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format`}           
                            srcSet={`${urlEndpoint}/tr:h-${imgSize},w-${imgSize}${row.filePath}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format&dpr=2 2x`}
                            alt={row.description}
                            loading="lazy"
                        />
                    </div>
                ),
                grow: 1,
            },
            {
                name: 'Ordem',
                selector: row => row.serial,
                cell: row => row.serial,
                sortable: true,
                maxWidth: '50px',
                grow: 0.5,
            },
            {
                name: 'Título',
                selector: row => row.title,
                cell: row => <span style={{ wordBreak: "break-word" }}> {truncate(row.title, 25)} </span>,
                //sortable: true,
                omit: true,
                //maxWidth: '200px',
                grow: 2,
            },              
            {
                name: 'Descrição',
                selector: row => row.description,
                cell: row => <span style={{ wordBreak: "break-word" }}> {truncate(row.description, 25)} </span>,
                sortable: true,
                //maxWidth: '200px',
                grow: 10,
            },  
            {
                name: 'Ano',
                selector: row => row.date,
                cell: row => row.date,
                //sortable: true,
                omit: true,
                maxWidth: '100px',
                grow: 1,
            },
            {
                name: 'Link',
                selector: row => row.technique,
                sortable: true,
                //maxWidth: '200px',
                //right: true,
                grow: 10,
            },
            {
                name: 'Dimensões',
                selector: row => row.dimensions,
                sortable: true,
                omit: true,
                //maxWidth: '200px',
                grow: 2,
            }, 
            {
                name: "Disponível", 
                selector: row => row.available,
                //sortable: true,
                omit: true,
                //reorder: true,
                //center: true,
                //right: true,
                cell: (row) => (
                    <IconButton 
                        color="success" 
                        disabled={!row.available}
                        disableFocusRipple
                        disableRipple
                        aria-label="obra disponível para aquisição" 
                        size="small" 
                        sx={{ fontSize: '10px' }} 
                    >
                        <CircleIcon fontSize="inherit" /> 
                    </IconButton>
                ),
                // cell: row => <Switch 
                //                 checked={row.available} 
                //                 inputProps={{ 'aria-label': 'Obra disponível para compra' }} 
                //                 size="small" 
                //                 color="success"
                //             />,
                grow: 1.5,
            },
            // {
            //     name: 'Ações',
            //     maxWidth: '80px',
            //     cell: row => <ActionMenu section={'contentarticles'} row={row}/>,
            //     right: true,
            //     grow: 1,
            // },
        ]
    );         













    return {
        fullProfilesColumns: fullProfilesColumns,
        fullResearchColumns: fullResearchColumns,
        authorsColumns: authorsColumns,
        authorsSourcesColumns: authorsSourcesColumns,
        researchSourcesColumns: researchSourcesColumns,
        pagesColumns: pagesColumns,
        //contentArticlesColumns: contentArticlesColumns, 
        researchImagesColumns: researchImagesColumns, 
    };
};

//import Chip from '@mui/material/Chip';
//import ToggleOffIcon from '@mui/icons-material/ToggleOff';
//import ToggleOnIcon from '@mui/icons-material/ToggleOn';
//import { toggleProfileActive } from '../features/membersSlice';