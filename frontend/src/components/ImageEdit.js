import * as React from 'react';
import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { deleteImage, updateImage } from '../features/imagesSlice';
//import { upsertContentArticle, deleteContentArticle } from '../features/researchSlice'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CollectionsIcon from '@mui/icons-material/Collections';
//import ClearIcon from '@mui/icons-material/Clear';
import { useHistory } from './history';
import { fitImageToContainer } from '../utils';

const ImageEdit = (props) => {

    const { image, onDelete } = props;
    
    const emptyContentArticle = {
        content_id: null,
        file_id: image.fileId,
    };

    // REDUX DISPATCH
    const dispatch = useDispatch();

    // MY HISTORY HOOK
    // const history = useHistory(); 
    // const content = useSelector(state => state.research.research);
    // const contentArticle = useSelector(state => state.research.content_articles).find(ca => ca.file_id === image.fileId) || emptyContentArticle;
    // const isContent = Boolean( history.pathArray[1] === 'admin' &&
    //                             history.pathArray[2] === 'research' &&
    //                             history.pathArray[3] === 'edit' );   

    // IMAGELIST WIDTH TRACKING
    const ref = useRef(null); 
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    // const [contentArticleData, setContentArticleData] = useState({ ...contentArticle }); 

    // GET MEASURES FROM THE DOM
    useLayoutEffect(() => {
        const refSize = ref.current.getBoundingClientRect();
        setWidth(refSize.width);
        setHeight(refSize.height);
    },[]);    
    // TRACK RESIZING WINDOW
    useEffect(() => {
        function handleWindowResize() {
            const refSize = ref.current.getBoundingClientRect();
            setWidth(refSize.width);
            setHeight(refSize.height);
        };

        window.addEventListener('resize', handleWindowResize);
    
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []); 

    // IMAGE RATIO HANDLING
    const imageRatio = (h,w) => {
        if(h > w) 
            return { height: height, width: w*height/h };
        else 
            return { height: h*width/w, width: width };
    };    

    // IMAGE STATES
    const [imageCustomMetaData, setCustomMetaData] = useState({
        title: image.title,
        description: image.description,
        date: image.date,
        technique: image.technique,
        dimensions: image.dimensions,
        serial: image.serial,
        available: image.available
    }); 

    // CHANGE METADATA STATES
    const handleImageCustomMetaData = (event) => {
        setCustomMetaData({...imageCustomMetaData, [event.target.name]: event.target.value});
    };
    const handleImageChecked = (event) => {
        setCustomMetaData({...imageCustomMetaData, available: event.target.checked});
      };

    // IMAGEKIT
    const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

    // HANDLE IMAGE EDIT
    const handleUpdateImage = () => {
        const imageObj = {
            fileid: image.fileId,
            folder: image.folder,
            customMetaData: imageCustomMetaData
        };
        onDelete();
        dispatch(updateImage(imageObj));
    };

    const handleDeleteImage = (fileid) => {
        onDelete();
        dispatch(deleteImage(fileid));
    };


    // SET ARTICLE CONTENT
    // const handleChangeContentArticleData = (event) => {
    //     const updatedcontentArticleData = {
    //         ...contentArticleData, 
    //         [event.target.name]: event.target.value
    //     }; //console.log('updatedcontentArticleData', updatedcontentArticleData);
    //     setContentArticleData(updatedcontentArticleData);
    //     dispatch(upsertContentArticle(updatedcontentArticleData))
    // };
    // CLEAR RELATED CONTENT
    // const handleClear = () => {
    //     setContentArticleData({...contentArticleData, content_id: null});
    //     dispatch(deleteContentArticle(contentArticleData)) //console.log('handleClear - delete content', contentArticleData);
    // };


    return (
        <Grid 
            container
            spacing={1}
            sx={{ p: 2, minHeight: '80vh', }}
        >
            <Grid item xs={12} >
                <Box 
                  ref={ref} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'stretch',
                    //m: 2,
                    height: '40vh',
                    width: '40vw'
                  }}
                >
                    {image.fileType !== 'non-image' ? (
                        <img 
                            src={`${urlEndpoint}/tr:h-${fitImageToContainer(image.width, image.height, width, height).h},w-${fitImageToContainer(image.width, image.height, width, height).w}${image.filePath}?w=${fitImageToContainer(image.width, image.height, width, height).w}&h=${fitImageToContainer(image.width, image.height, width, height).h}&fit=contain&auto=format`}           
                            srcSet={`${urlEndpoint}/tr:h-${fitImageToContainer(image.width, image.height, width, height).h},w-${fitImageToContainer(image.width, image.height, width, height).w}${image.filePath}?w=${fitImageToContainer(image.width, image.height, width, height).w}&h=${fitImageToContainer(image.width, image.height, width, height).h}&fit=contain&auto=format&dpr=2 2x`}
                            alt={image.description}
                        />
                    ) : (
                        null
                    )}
                </Box>
            </Grid>
  
            <Grid item xs={12}  >
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} sx={{ pb: 3, }}>
                    <Typography component="div" variant="subtitle" sx={{ fontWeight: 600, }}>
                        {image.name}
                    </Typography>
                    <IconButton component={Link} to={image.url} target="_blank">
                        {image.fileType === 'non-image' ? 
                            <PictureAsPdfIcon color="primary" fontSize="inherit" /> 
                            :  
                            <CollectionsIcon color="primary" fontSize="inherit" /> 
                        }
                    </IconButton>
                </Stack>

                {/* <TextField
                    value={imageCustomMetaData.title}
                    onChange={(event) => handleImageCustomMetaData(event)} 
                    fullWidth
                    label="Título"
                    name="title"
                    size="small"
                    margin="dense"
                    type="text"
                    multiline
                    minRows={1}
                    maxRows={4}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    value={imageCustomMetaData.date}
                    onChange={(event) => handleImageCustomMetaData(event)} 
                    fullWidth
                    label="Ano"
                    name="date"
                    size="small"
                    margin="dense"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                /> */}
                <TextField
                    value={imageCustomMetaData.description}
                    onChange={(event) => handleImageCustomMetaData(event)} 
                    fullWidth
                    label="Descrição"
                    name="description"
                    size="small"
                    margin="dense"
                    type="text"
                    multiline
                    minRows={1}
                    maxRows={4}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    value={imageCustomMetaData.technique}
                    onChange={(event) => handleImageCustomMetaData(event)} 
                    fullWidth
                    //label={isContent ? 'Técnica' : 'Autor'}
                    label="Fonte"
                    name="technique"
                    size="small"
                    margin="dense"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    value={imageCustomMetaData.serial}
                    onChange={(event) => handleImageCustomMetaData(event)} 
                    fullWidth
                    label="Ordem (define a ordem de exbição das imagens)"
                    name="serial"
                    size="small"
                    margin="dense"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                />
                {/* <TextField
                    value={imageCustomMetaData.dimensions}
                    onChange={(event) => handleImageCustomMetaData(event)} 
                    fullWidth
                    label={isContent ? 'Dimensões' : 'Categoria'}
                    name="dimensions"
                    size="small"
                    margin="dense"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                /> */}

                {/* {isContent ? (
                    <TextField
                        value={imageCustomMetaData.serial}
                        onChange={(event) => handleImageCustomMetaData(event)} 
                        fullWidth
                        label="Ordem"
                        name="serial"
                        size="small"
                        margin="dense"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                    />

                    ) : ( null )
                }
 
                {isContent ? (
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch 
                                        checked={imageCustomMetaData.available} 
                                        onChange={handleImageChecked}
                                        inputProps={{ 'aria-label': 'Obra disponível para aquisição' }} 
                                        color="success"
                                    />
                                }
                                label="Disponível para aquisição"
                            />
                        </FormGroup>
                    </FormControl> 
                    ) : ( null )
                } */}

                {/* {!isContent ? (
                    <TextField
                        select
                        fullWidth
                        name="content_id"
                        label="Publicação Relacionada (Opcional)"
                        size="small"
                        value={contentArticleData.content_id}
                        onChange={(event) => handleChangeContentArticleData(event)}
                        sx={{my: 1, "& .MuiSelect-iconOutlined": {display: contentArticleData.content_id ? 'none': ''}, }}
                        InputProps={{
                            endAdornment: (
                            <IconButton edge="end"  sx={{visibility: contentArticleData.content_id ? "visible": "hidden"}} onClick={handleClear}>
                                <ClearIcon />
                            </IconButton>
                            ),
                        }}
                        InputLabelProps={{ shrink: true }}
                        >
                        {content.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.title}
                            </MenuItem>
                        ))}
                    </TextField>

                    ) : ( null )
                } */}

                <Button 
                    variant="contained" 
                    color="success"
                    size="small"
                    fullWidth 
                    sx={{ mt: 2,}} 
                    onClick={handleUpdateImage}  
                >
                    Salvar
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    size="small"
                    fullWidth 
                    sx={{ mt: 1,}} 
                    onClick={() => handleDeleteImage(image.fileId)}   
                >
                    Excluir Definitivamente
                </Button>
            </Grid>
        </Grid>
    );

};

export default ImageEdit;

































// import * as React from 'react';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteImage, updateImage } from '../features/imagesSlice';
// import PropTypes from 'prop-types';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';

// import { IKContext, IKImage } from 'imagekitio-react';

// const ImageEdit = (props) => {

//     const { image, onDelete } = props;

//     // REDUX DISPATCH
//     const dispatch = useDispatch();

//     // IMAGE STATES
//     const [description, setDescription] = useState(image.description);

//     // IMAGEKIT
//     const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

//     // HANDLE IMAGE EDIT
//     const handleUpdateImage = () => {
//         const imageObj = {
//             fileid: image.fileId,
//             description: description
//         };
//         onDelete();
//         dispatch(updateImage(imageObj));
//     };

//     const handleDeleteImage = (fileid) => {
//         onDelete();
//         dispatch(deleteImage(fileid));
//     };

//     return (
//         <Grid 
//             container
//             direction="row"
//             justifyContent="top"
//             alignItems="flex-start"
//             sx={{ p: 3,}}
//         >
//             <Grid item xs={12} md={8} >
//                 <IKContext urlEndpoint={urlEndpoint} >
//                     <IKImage 
//                         path={image.filePath} 
//                         width="400"
//                     />
//                 </IKContext>
//             </Grid>
  
//             <Grid item xs={12} md={4} > 

//                 <TextField
//                     value={image.name}
//                     fullWidth
//                     label="Nome Único"
//                     name="name"
//                     size="small"
//                     type="text"
//                     disabled
//                     sx={{ mb: 2,}}
//                     InputLabelProps={{ shrink: true }}
//                 />

//                 <TextField
//                     value={description}
//                     onChange={(event) => setDescription(event.target.value)}
//                     fullWidth
//                     label="Descrição"
//                     name="description"
//                     size="small"
//                     type="text"
//                     multiline
//                     minRows={3}
//                     maxRows={5}
//                     helperText="Legenda disponível publicamente"
//                     sx={{ mb: 2,}}
//                     InputLabelProps={{ shrink: true }}
//                 />
//                 <Button 
//                     variant="contained" 
//                     fullWidth 
//                     sx={{ mb: 1,}} 
//                     onClick={handleUpdateImage}  
//                 >
//                     Salvar
//                 </Button>
//                 <Button 
//                     variant="contained" 
//                     color="error"
//                     fullWidth 
//                     onClick={() => handleDeleteImage(image.fileId)}   
//                 >
//                     Excluir Definitivamente
//                 </Button>
//             </Grid>
//         </Grid>
//     );

// };

// export default ImageEdit;

// ImageEdit.defaultProps = {
//     folder: '/',
//     tags: []
// }

// ImageEdit.propTypes = {
//     folder: PropTypes.string,
//     tags: PropTypes.array
// };
