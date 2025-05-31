import * as React from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { 
    selectArticles, 
    selectAuthorArticles, 
    selectCatalogues, 
    selectClipping } from '../features/imagesSlice'; 
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Title from './Title'; 
// REACT DATA TABLE COMPONENT
import ImagekitEditableTable from './ImagekitEditableTable';
import FilteredDataTable from './FilteredDataTable';
import { useTableTemplates } from './tableTemplates';
import { sortImages, folderSetter, buttonArticleIndexSetter } from '../utils'

// MY HISTORY HOOK
import { useHistory } from './history';

const ImagekitFilesIndex = () => {

    // REACT ROUTER DYNAMIC PARAMETER 
    let params = useParams();  

    // TABLE TEMPLATES HOOK
    const tableTemplates = useTableTemplates(); 

    // MY HISTORY HOOK
    const history = useHistory(); 
    //const context = history?.pathArray[2] || ''

    // REDUX SELECTORS
    // ARTICLES TO CONTENT ARTICLES EDIT PAGE
    const articles = useSelector(selectArticles); console.log('articles', articles);
    const authorArticles = useSelector(selectAuthorArticles); 
    const catalogues = useSelector(selectCatalogues);
    const clipping = useSelector(selectClipping);
    const getImagesStatus = useSelector(state => state.images.getImagesStatus);
    // IMAGES TO CONTENT EDIT PAGE
    const images = useSelector(state => state.images.images); 
    const contentImages = images ? images.filter(i => parseInt(i.folder, 10) === parseInt(params.researchId, 10) && i.fileType === 'image').sort(sortImages) : []; console.log('contentImages', contentImages); 

    const createContentTable = Boolean( getImagesStatus === "succeeded" );
    const isContentEdit = Boolean( history.pathArray[1] === "admin" &&
                                    history.pathArray[2] === "research" && 
                                    history.pathArray[3] === "edit" ); 

    const isContentArticle = Boolean( history.pathArray[2] === "contentarticles" ); 

    const imagesSetter = (path) => {
        if(path === 'contentarticles') {
            return articles;
        } if(path === 'contentauthorarticles') {
            return authorArticles;
        } if(path === 'contentcatalogues') {
            return catalogues;
        } else {
            return clipping;
        };
    };

    // const folderSetter = (path) => {
    //     if(path === 'contentarticles') {
    //         return 'articles';
    //     } if(path === 'contentauthorarticles') {
    //         return 'authorarticles';
    //     } if(path === 'contentcatalogues') {
    //         return 'catalogues';
    //     } else {
    //         return 'clipping';
    //     };
    // };

    const [editing, setEditing] = useState(false);

    const index = () => {
        if(editing) {
            return (
                <Grid item xs={12} >
                    <Paper square elevation={1}>
                        <Grid item xs={12} sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', }}>
                            <Stack 
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={1}
                            >
                                <Box sx={{ flexgrow: 1, }}/> 
                                <Button 
                                    variant="contained" 
                                    size="small"
                                    margin="dense"
                                    color="success"
                                    onClick={() => setEditing(!editing)}  
                                >
                                    Salvar
                                </Button>
                            </Stack> 
                        </Grid>    
                        <Divider />

                        {/* {createContentTable && articles?.length > 0 ? ( */}
                        {createContentTable ? (
                            <ImagekitEditableTable 
                                // stateData={isContentEdit ? contentImages : imagesSetter(history.pathArray[2]) } 
                                stateData={contentImages}
                                title={<Title position={'editImagekitIndex'}/>}
                                // folder={isContentEdit ? params.researchId : folderSetter(history.pathArray[2]) }
                                folder={params.researchId}
                            />
                        ) : (
                            <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                                Sem dados para exibir
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12} >
                    <Paper square elevation={1}>
                        <Grid item xs={12} sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', }}>
                            <Stack 
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={1}
                            >
                                <Box sx={{ flexgrow: 1, }}/> 
                                <Button 
                                    variant="contained" 
                                    size="small"
                                    margin="dense"
                                    onClick={() => setEditing(!editing)}  
                                >
                                    {isContentEdit ? 'Editar Descrição das Imagens' : buttonArticleIndexSetter(history.pathArray[2]) }
                                </Button>
                            </Stack> 
                        </Grid>    
                        <Divider />

                        {/* {createContentTable && articles?.length > 0 ? ( */}
                        {createContentTable ? (
                            <FilteredDataTable  
                                // data={isContentEdit ? contentImages : imagesSetter(history.pathArray[2]) } 
                                data={contentImages}
                                // columns={isContentEdit ? tableTemplates.researchImagesColumns : tableTemplates.contentArticlesColumns} 
                                columns={tableTemplates.researchImagesColumns} 
                                title={<Title position={'imagekitIndex'}/> }
                                dense={true}
                            />
                        ) : (
                            <Typography component="div" variant="body1" color="inherit" sx={{ fontStyle: 'italic', textAlign: 'center', pt: 4, }}>
                                Sem dados para exibir
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            );
        }
            
    }; 
    
    return index();

};

export default ImagekitFilesIndex;





