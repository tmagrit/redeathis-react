import * as React from 'react';
import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DefaultDialog from './DefaultDialog';
import ImageEdit from './ImageEdit';
import { imageDescription, sortImages, contentEditImageGridLayout } from '../utils';
import { useHistory } from './history';

const ImageGallery = () => {

    // IMAGEKIT
    const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

    // MY HISTORY HOOK
    const history = useHistory(); console.log('history', history.pathArray);

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const images = useSelector(state => state.images.images); 
    const contentImages = images ? images.filter(i => parseInt(i.folder, 10) === parseInt(params.researchId, 10) && i.fileType === 'image').sort(sortImages) : [];  console.log('contentImages',contentImages);
    const contentEditImageGallerySize = useSelector(state => state.research.contentEditImageGallerySize); 

    // IMAGEGRID LAYOUT ELEMENTS
    const imgSize = 280;
    const gap = 8;
    const imgCount = contentImages ? contentImages.length : 0; console.log('imgCount', imgCount);
    const grid = contentEditImageGridLayout(contentEditImageGallerySize, imgCount, imgSize, gap); console.log('grid', grid);
    
    // DIALOG STATES 
    const [dialogOpen, setDialogOpen] = useState(false);
    const [image, setImage] = useState(null);

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = (image) => {
        setImage(image);
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    // CONTENT GALLERY
    if( history.pathArray[0] === 'admin' &&
        history.pathArray[1] === 'research' &&
        history.pathArray[2] === 'edit' ) {

            if(imgCount && contentImages) 
                return (
                    <ImageList 
                        sx={{ width: grid.width, overflow: 'hidden', }} 
                        rowHeight={grid.imgSize}
                        cols={grid.cols} 
                        gap={grid.imgGap}
                    >
                        {contentImages.map(ci => (
                            <ImageListItem key={ci.fileId}>
                                <img 
                                    src={`${urlEndpoint}/tr:h-${imgSize},w-${imgSize}${ci.filePath}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format`}           
                                    srcSet={`${urlEndpoint}/tr:h-${imgSize},w-${imgSize}${ci.filePath}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format&dpr=2 2x`}
                                    alt={ci.description}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    position="bottom"
                                    sx={{
                                        background:
                                            'linear-gradient(to top, rgba(0,0,0,0.5) 0%, ' +
                                            'rgba(0,0,0,0.4) 100%)',
                                    }}
                                    title={imageDescription(ci).title}
                                    subtitle={imageDescription(ci).subtitle}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={ci.description}
                                            onClick={() => handleDialogOpen(ci)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}

                        <DefaultDialog
                            fullWidth={true}
                            maxWidth={'lg'}
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            title={'Editar Imagem'}
                            children={<ImageEdit image={image} onDelete={() => setDialogOpen(false)}  />} 
                        />

                    </ImageList> 
                )
            else 
                return (
                    <Box 
                      sx={{ 
                        display: 'flex',                                 
                        direction: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%', 
                        minHeight: '450px', 
                        background: '#f5f5f5', 
                        borderWidth: '2px',
                        borderStyle: 'dashed',
                        borderColor: '#e0e0e0'
                      }} 
                    >
                        <Typography component="div" variant="h6" color="inherit" sx={{ color: 'text.disabled', fontStyle: 'italic', textAlign: 'center', pt: 2, }}>
                            Sem imagens para exibir
                        </Typography> 
                    </Box>
                );
        }
    else {
        return null;
    };

};

export default ImageGallery;

















// import * as React from 'react';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from "react-router-dom";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';

// import DefaultDialog from './DefaultDialog';
// import ImageEdit from './ImageEdit';

// // MY HISTORY HOOK
// import { useHistory } from './history';

// const ImageGallery = () => {

//     // IMAGEKIT
//     const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

//     // MY HISTORY HOOK
//     const history = useHistory();

//     // REACT ROUTER DYNAMIC PARAMETER
//     let params = useParams();

//     // REDUX SELECTORS
//     const images = useSelector(state => state.images.images);  
    
//     // DIALOG STATES 
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [image, setImage] = useState(null);

//     // HANDLE TOGGLE DIALOG
//     const handleDialogOpen = (image) => {
//         setImage(image);
//         setDialogOpen(true);
//     };
//     const handleDialogClose = () => {
//         setDialogOpen(false);
//     };

//     // CONTENT GALLERY
//     if( history.pathArray[1] === 'admin' &&
//         history.pathArray[2] === 'research' &&
//         history.pathArray[3] === 'edit' ) {
            
//             const researchImages = images?.filter(i => parseInt(i.folder, 10) === parseInt(params.researchId, 10) && i.fileType === 'image');

//             return (
//                 <Grid 
//                     container
//                     direction="row"
//                     justifyContent="center"
//                     alignItems="center"
//                 >
//                     <Grid item xs={12} >
//                             {researchImages?.length > 0 ? (
//                                 <React.Fragment >
//                                     <ImageList sx={{ width: '100%', minHeight: '450px' }} cols={3} rowHeight={164} variant="masonry" >
//                                         {researchImages.map(ri => (
                                            
//                                             <ImageListItem key={ri.fileId}>
//                                                 <img 
//                                                     src={`${urlEndpoint}/tr:n-media_library_thumbnail${ri.filePath}?w=164&h=164&fit=crop&auto=format`}
//                                                     srcSet={`${urlEndpoint}/tr:n-media_library_thumbnail${ri.filePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//                                                     alt={ri.description}
//                                                     loading="lazy"
//                                                 />
//                                                 <ImageListItemBar
//                                                     position="top"
//                                                     sx={{
//                                                         background:
//                                                             'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
//                                                             'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//                                                     }}
//                                                     subtitle={ri.description}
//                                                     actionIcon={
//                                                         <IconButton
//                                                             sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
//                                                             aria-label={ri.description}
//                                                             onClick={() => handleDialogOpen(ri)}
//                                                         >
//                                                             <EditIcon />
//                                                         </IconButton>
//                                                     }
//                                                 />
//                                             </ImageListItem>
//                                         ))}
//                                     </ImageList>  

//                                     <DefaultDialog
//                                         fullWidth={true}
//                                         open={dialogOpen}
//                                         onClose={handleDialogClose}
//                                         title={'Editar Imagem'}
//                                         children={<ImageEdit image={image} onDelete={() => setDialogOpen(false)} maxWidth={'lg'} />} 
//                                     />
//                                 </React.Fragment>  
                                    
//                                 ) : (
//                                     <Box sx={{ 
//                                                 display: 'flex',                                 
//                                                 direction: 'row',
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                                 width: '100%', 
//                                                 minHeight: '450px', 
//                                                 background: '#f5f5f5', 
//                                                 borderWidth: '2px',
//                                                 borderStyle: 'dashed',
//                                                 borderColor: '#e0e0e0'
//                                             }} >
//                                         <Typography component="div" variant="h6" color="inherit" sx={{ color: 'text.disabled', fontStyle: 'italic', textAlign: 'center', pt: 2, }}>
//                                             Sem imagens para exibir
//                                         </Typography> 
//                                     </Box>
//                                 )
//                             }
                          


//                     </Grid>
//                 </Grid>
//             );
//         }
//     else {
//         return null;
//     };

// };

// export default ImageGallery;

// ImageGallery.defaultProps = {
  
// }

// ImageGallery.propTypes = {

// };
