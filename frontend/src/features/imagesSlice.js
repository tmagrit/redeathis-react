import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getImagesUrl = process.env.REACT_APP_GET_IMAGES_URL;
const delImageUrl = process.env.REACT_APP_DEL_IMAGE_URL;
const updateImageUrl = process.env.REACT_APP_UPDATE_IMAGE_URL

export const getImages = createAsyncThunk('images/getImages', async (obj , { dispatch, getState }) => {
    try { 
        const { data : data, error: error } = await axios.get(`${getImagesUrl}`);
        
        if(error) {
            throw error
        };

        if(data) {
            const pathData = data.map(d => {
                let folder = d.filePath.split('/')
                return ({
                    ...d,
                    ...(d.customMetadata.description ? { description: d.customMetadata.description } : { description: '' }),
                    folder: folder[1]
                })
            });

            return pathData;
        } else {
            return [];
        }

    } catch (error) {
        alert('getImages()-error')
        console.log(error)
        alert(error.message)
    };
});

export const deleteImage = createAsyncThunk('images/deleteImage', async (obj , { dispatch, getState }) => {
    try { 
        const { status, error } = await axios.get(`${delImageUrl}?fileid=${obj}`);
        
        if(error) {
            throw error
        };

        //if(status === '204'){
            dispatch(removeImage(obj));
            alert(`Imagem ${obj} deletada com sucesso. Status: ${status}`)
        //};

    } catch (error) {
        alert('deleteImage()-error')
        console.log(error)
        alert(error.message)
    };
});

export const updateImage = createAsyncThunk('images/updateImage', async (obj , { dispatch, getState }) => {
    try { 
        const { images } = getState()
        const { data, error } = await axios.get(`${updateImageUrl}?fileid=${obj.fileid}&description=${obj.description}`);
        
        const payload = images.images.map(i => {
            if(i.fileId === obj.fileid) {
                let folder = data.filePath.split('/');
                let newData = {
                    ...data,
                    folder: folder[1],
                    description: data.customMetadata.description
                };

                return newData;
            } else 
                return i;
        });  

        alert('Detalhes atualizados com sucesso.');
        
        if(error) {
            throw error
        }  

        return payload;

    } catch (error) {
        alert('updateImages()-error')
        console.log(error)
        alert(error.message)
    };
});

export const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        images: [],
        getImagesStatus: 'idle',
        getImagesError: null,        

        deleteImageStatus: 'idle',
        deleteImageError: null,

        updateImageStatus: 'idle',
        updateImageError: null,

        // getImagesCategoriesStatus: 'idle',
        // getImagesCategoriesError: null,

    },
    reducers: {
        removeImage(state, action) { 
            const newImages = state.images.filter(i => i.fileId !== action.payload);
            state.images = newImages;
        }
    },
    extraReducers: {

        [getImages.pending]: (state) => {
            state.getImagesStatus = 'loading'
        },
        [getImages.fulfilled]: (state, action) => {
            state.images = action.payload
            state.getImagesStatus = 'succeeded'
        },
        [getImages.rejected]: (state, action) => {
          state.getImagesStatus = 'failed'
          state.getImagesError = action.error
        },

        [deleteImage.pending]: (state) => {
            state.deleteImageStatus = 'loading'
        },
        [deleteImage.fulfilled]: (state, action) => {
            //state.content.unshift(action.payload)
            state.deleteImageStatus = 'succeeded'
        },
        [deleteImage.rejected]: (state, action) => {
          state.deleteImageStatus = 'failed'
          state.deleteImageError = action.error
        },

        [updateImage.pending]: (state) => {
            state.updateImagesStatus = 'loading'
        },
        [updateImage.fulfilled]: (state, action) => {
            state.images = action.payload
            state.updateImagesStatus = 'succeeded'
        },
        [updateImage.rejected]: (state, action) => {
          state.updateImagesStatus = 'failed'
          state.updateImagesError = action.error
        },

      }
})

export const { 
    removeImage
} = imagesSlice.actions;


export default imagesSlice.reducer