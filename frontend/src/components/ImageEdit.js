import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImage, updateImage } from '../features/imagesSlice';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { IKContext, IKImage } from 'imagekitio-react';

const ImageEdit = (props) => {

    const { image, onDelete } = props;

    // REDUX DISPATCH
    const dispatch = useDispatch();

    // IMAGE STATES
    const [description, setDescription] = useState(image.description);

    // IMAGEKIT
    const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

    // HANDLE IMAGE EDIT
    const handleUpdateImage = () => {
        const imageObj = {
            fileid: image.fileId,
            description: description
        };
        onDelete();
        dispatch(updateImage(imageObj));
    };

    const handleDeleteImage = (fileid) => {
        onDelete();
        dispatch(deleteImage(fileid));
    };

    return (
        <Grid 
            container
            direction="row"
            justifyContent="top"
            alignItems="flex-start"
            sx={{ p: 3,}}
        >
            <Grid item xs={12} md={8} >
                <IKContext urlEndpoint={urlEndpoint} >
                    <IKImage 
                        path={image.filePath} 
                        width="400"
                    />
                </IKContext>
            </Grid>
  
            <Grid item xs={12} md={4} > 

                <TextField
                    value={image.name}
                    fullWidth
                    label="Nome Único"
                    name="name"
                    size="small"
                    type="text"
                    disabled
                    sx={{ mb: 2,}}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    fullWidth
                    label="Descrição"
                    name="description"
                    size="small"
                    type="text"
                    multiline
                    minRows={3}
                    maxRows={5}
                    helperText="Legenda disponível publicamente"
                    sx={{ mb: 2,}}
                    InputLabelProps={{ shrink: true }}
                />
                <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ mb: 1,}} 
                    onClick={handleUpdateImage}  
                >
                    Salvar
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    fullWidth 
                    onClick={() => handleDeleteImage(image.fileId)}   
                >
                    Excluir Definitivamente
                </Button>
            </Grid>
        </Grid>
    );

};

export default ImageEdit;

ImageEdit.defaultProps = {
    folder: '/',
    tags: []
}

ImageEdit.propTypes = {
    folder: PropTypes.string,
    tags: PropTypes.array
};
