import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sortImages, sortStrings, sortDescendentStrings } from '../utils'; 

const getImagesUrl = process.env.REACT_APP_GET_IMAGES_URL;
const delImageUrl = process.env.REACT_APP_DEL_IMAGE_URL;
const updateImageUrl = process.env.REACT_APP_UPDATE_IMAGE_URL;

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
                    ...(d.customMetadata.title ? { title: d.customMetadata.title } : { title: '' }),
                    ...(d.customMetadata.description ? { description: d.customMetadata.description } : { description: '' }),
                    ...(d.customMetadata.date ? { date: d.customMetadata.date } : { date: '' }),
                    ...(d.customMetadata.technique ? { technique: d.customMetadata.technique } : { technique: '' }),
                    ...(d.customMetadata.dimensions ? { dimensions: d.customMetadata.dimensions } : { dimensions: '' }),
                    ...(d.customMetadata.serial ? { serial: d.customMetadata.serial } : { serial: '' }),
                    ...(d.customMetadata.available ? { available: d.customMetadata.available } : { available: false }),
                    folder: folder[1]
                })
            });

            // const folderList = pathData.map(pd => pd.folder)
            // console.log('folderList', folderList)

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
        const { data, error } = await axios.get(`${updateImageUrl}?fileid=${obj.fileid}&title=${obj.customMetaData.title}&description=${obj.customMetaData.description}&date=${obj.customMetaData.date}&technique=${obj.customMetaData.technique}&dimensions=${obj.customMetaData.dimensions}&serial=${obj.customMetaData.serial}&available=${obj.customMetaData.available}`);
     
        const payload = images.images.map(i => {
            if(i.fileId === obj.fileid) {
                let newData = {
                    ...data,
                    folder: obj.folder,
                    title: '',
                    description: '',
                    date: '',
                    technique: '',
                    dimensions: '',
                    serial: '',
                    available: false
                };
                if(data.customMetadata) {
                    newData = {
                        ...newData,
                        ...data.customMetadata
                    };
                }

                return newData;
            } else 
                return i;
        });  

        //alert('Detalhes atualizados com sucesso.');
        
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

// SELECTOR OF HOME FEATURED IMAGES 
export const selectFeaturedContents  = state => {
    if (    state.images.getImagesStatus === 'succeeded' && 
            state.content.getContentStatus === 'succeeded' ) {
        
        const publicContent = state.research.content.filter(c => c.status === 1);
        const featuredContent = publicContent.filter(pc => pc.featured === true); //console.log('featuredContent', featuredContent)
        const featuredContentIds = featuredContent.map(fc => fc.id);
        const images = state.images.images;
        const contentImages = images
            .filter(i => featuredContentIds.includes(parseInt(i.folder, 10)) && i.fileType === 'image')
            .sort(sortImages); 
        const featuredImages =  featuredContentIds.map(fcid => contentImages.find(ci => parseInt(ci.folder, 10) === fcid)); 
        const newFeaturedContent = featuredContent.map(fc => { //console.log('fc', fc, 'featuredImages', featuredImages.find(fi => parseInt(fi.folder, 10) === fc.id))
            return ({
                        ...fc, 
                        featuredImage: featuredImages.find(fi => parseInt(fi.folder, 10) === fc.id),
                    });
        });

    const nonEmptyFeaturedContent = newFeaturedContent ? 
        newFeaturedContent.filter(fc => fc.featuredImage.hasOwnProperty("fileId")) : null; 
  
        return nonEmptyFeaturedContent;
    }

    return null;
};

// SELECTOR OF ARTICLES 
export const selectArticles  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        const articles = images.filter(i => i.folder === 'articles').sort(sortImages); 

        return articles;
    }

    return null;
};

// SELECTOR ARTICLES CATEGORIES 
export const selectArticlesCategories  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        const articlesCategories = images
            .filter(i => i.folder === 'articles')
            .map(a => { return a.dimensions }); 

        const uniqueCategories = articlesCategories.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []); 

        return uniqueCategories.sort(sortStrings); 
    }

    return null;
};

// SELECTOR OF AUTHOR ARTICLES
export const selectAuthorArticles  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        const articles = images.filter(i => i.folder === 'authorarticles').sort(sortImages); 

        return articles;
    }

    return null;
};

// SELECTOR AUTHOR ARTICLES CATEGORIES 
export const selectAuthorArticlesCategories  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        const articlesCategories = images
            .filter(i => i.folder === 'authorarticles')
            .map(a => { return a.dimensions }); 

        const uniqueCategories = articlesCategories.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []); 

        return uniqueCategories.sort(sortStrings); 
    }

    return null;
};

// SELECTOR OF CATALOGUES 
export const selectCatalogues  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        const articles = images.filter(i => i.folder === 'catalogues').sort(sortImages); 

        return articles;
    }

    return null;
};

// SELECTOR CATALOGUES CATEGORIES 
export const selectCataloguesCategories  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        const articlesCategories = images
            .filter(i => i.folder === 'catalogues')
            .map(a => { return a.dimensions }); 

        const uniqueCategories = articlesCategories.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []); 

        return uniqueCategories.sort(sortStrings); 
    }

    return null;
};

// SELECTOR OF CLIPPING 
export const selectClipping  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        const clipping = images.filter(i => i.folder === 'clipping').sort(sortImages); 

        return clipping;
    }

    return null;
};

// SELECTOR CLIPPING CATEGORIES 
export const selectClippingCategories  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        const clippingCategories = images
            .filter(i => i.folder === 'clipping')
            .map(a => { return a.dimensions }); 

        const uniqueCategories = clippingCategories.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []); 

        return uniqueCategories.sort(sortStrings); 
    }

    return null;
};

// SELECTOR CLIPPING CATEGORIES 
export const selectRelatedContentChronology  = state => {
    if (    state.images.getImagesStatus === 'succeeded' ) {
        const images = state.images.images;
        // const imagesYears = images
        //     .filter(i => i.folder !== 'articles' && i.folder === 'authorarticles' && i.folder === 'clipping' && i.folder === 'catalogues' )
        //     .map(a => { return a.date }); 
        const articlesYears = images
            .filter(i => i.folder === 'articles')
            .map(a => { return a.date }); 
        const authorArticlesYears = images
            .filter(i => i.folder === 'authorarticles')
            .map(a => { return a.date });             
        const clippingYears = images
            .filter(i => i.folder === 'clipping')
            .map(a => { return a.date }); 
        const cataloguesYears = images
            .filter(i => i.folder === 'catalogues')
            .map(a => { return a.date }); 

        // const uniqueImagesYears = imagesYears.reduce((uniqueArr, current) => {
        //         if (!uniqueArr.includes(current)) {
        //             uniqueArr.push(current);
        //         }
    
        //         return uniqueArr;
        //     }, []);     
        const uniqueArticlesYears = articlesYears.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []); 
        const uniqueAuthorArticlesYears = authorArticlesYears.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []);
        const uniqueClippingYears = clippingYears.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []);
        const uniqueCataloguesYears = cataloguesYears.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []);

        return { 
            articles: uniqueArticlesYears.sort(sortDescendentStrings),
            authorArticles: uniqueAuthorArticlesYears.sort(sortDescendentStrings),
            clipping: uniqueClippingYears.sort(sortDescendentStrings),
            catalogues: uniqueCataloguesYears.sort(sortDescendentStrings),
        }; 
    }

    return null;
};

export const { 
    removeImage
} = imagesSlice.actions;


export default imagesSlice.reducer



















// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const getImagesUrl = process.env.REACT_APP_GET_IMAGES_URL;
// const delImageUrl = process.env.REACT_APP_DEL_IMAGE_URL;
// const updateImageUrl = process.env.REACT_APP_UPDATE_IMAGE_URL;

// export const getImages = createAsyncThunk('images/getImages', async (obj , { dispatch, getState }) => {
//     try { 
//         const { data : data, error: error } = await axios.get(`${getImagesUrl}`);
        
//         if(error) {
//             throw error
//         };

//         if(data) {
//             const pathData = data.map(d => {
//                 let folder = d.filePath.split('/')
//                 return ({
//                     ...d,
//                     ...(d.customMetadata.title ? { title: d.customMetadata.title } : { title: '' }),
//                     ...(d.customMetadata.description ? { description: d.customMetadata.description } : { description: '' }),
//                     ...(d.customMetadata.date ? { date: d.customMetadata.date } : { date: '' }),
//                     ...(d.customMetadata.technique ? { technique: d.customMetadata.technique } : { technique: '' }),
//                     ...(d.customMetadata.dimensions ? { dimensions: d.customMetadata.dimensions } : { dimensions: '' }),
//                     ...(d.customMetadata.serial ? { serial: d.customMetadata.serial } : { serial: '' }),
//                     ...(d.customMetadata.available ? { available: d.customMetadata.available } : { available: false }),
//                     folder: folder[1]
//                 })
//             });

//             // const folderList = pathData.map(pd => pd.folder)
//             // console.log('folderList', folderList)

//             return pathData;
//         } else {
//             return [];
//         }

//     } catch (error) {
//         alert('getImages()-error')
//         console.log(error)
//         alert(error.message)
//     };
// });

// export const deleteImage = createAsyncThunk('images/deleteImage', async (obj , { dispatch, getState }) => {
//     try { 
//         const { status, error } = await axios.get(`${delImageUrl}?fileid=${obj}`);
        
//         if(error) {
//             throw error
//         };

//         //if(status === '204'){
//             dispatch(removeImage(obj));
//             alert(`Imagem ${obj} deletada com sucesso. Status: ${status}`)
//         //};

//     } catch (error) {
//         alert('deleteImage()-error')
//         console.log(error)
//         alert(error.message)
//     };
// });

// export const updateImage = createAsyncThunk('images/updateImage', async (obj , { dispatch, getState }) => {
//     try { 
//         const { images } = getState()
//         const { data, error } = await axios.get(`${updateImageUrl}?fileid=${obj.fileid}&title=${obj.customMetaData.title}&description=${obj.customMetaData.description}&date=${obj.customMetaData.date}&technique=${obj.customMetaData.technique}&dimensions=${obj.customMetaData.dimensions}&serial=${obj.customMetaData.serial}&available=${obj.customMetaData.available}`);
     
//         const payload = images.images.map(i => {
//             if(i.fileId === obj.fileid) {
//                 let newData = {
//                     ...data,
//                     folder: obj.folder,
//                     title: '',
//                     description: '',
//                     date: '',
//                     technique: '',
//                     dimensions: '',
//                     serial: '',
//                     available: false
//                 };
//                 if(data.customMetadata) {
//                     newData = {
//                         ...newData,
//                         ...data.customMetadata
//                     };
//                 }

//                 return newData;
//             } else 
//                 return i;
//         });  

//         //alert('Detalhes atualizados com sucesso.');
        
//         if(error) {
//             throw error
//         }  

//         return payload;

//     } catch (error) {
//         alert('updateImages()-error')
//         console.log(error)
//         alert(error.message)
//     };
// });

// export const imagesSlice = createSlice({
//     name: 'images',
//     initialState: {
//         images: [],
//         getImagesStatus: 'idle',
//         getImagesError: null,        

//         deleteImageStatus: 'idle',
//         deleteImageError: null,

//         updateImageStatus: 'idle',
//         updateImageError: null,

//         // getImagesCategoriesStatus: 'idle',
//         // getImagesCategoriesError: null,

//     },
//     reducers: {
//         removeImage(state, action) { 
//             const newImages = state.images.filter(i => i.fileId !== action.payload);
//             state.images = newImages;
//         }
//     },
//     extraReducers: {

//         [getImages.pending]: (state) => {
//             state.getImagesStatus = 'loading'
//         },
//         [getImages.fulfilled]: (state, action) => {
//             state.images = action.payload
//             state.getImagesStatus = 'succeeded'
//         },
//         [getImages.rejected]: (state, action) => {
//           state.getImagesStatus = 'failed'
//           state.getImagesError = action.error
//         },

//         [deleteImage.pending]: (state) => {
//             state.deleteImageStatus = 'loading'
//         },
//         [deleteImage.fulfilled]: (state, action) => {
//             //state.content.unshift(action.payload)
//             state.deleteImageStatus = 'succeeded'
//         },
//         [deleteImage.rejected]: (state, action) => {
//           state.deleteImageStatus = 'failed'
//           state.deleteImageError = action.error
//         },

//         [updateImage.pending]: (state) => {
//             state.updateImagesStatus = 'loading'
//         },
//         [updateImage.fulfilled]: (state, action) => {
//             state.images = action.payload
//             state.updateImagesStatus = 'succeeded'
//         },
//         [updateImage.rejected]: (state, action) => {
//           state.updateImagesStatus = 'failed'
//           state.updateImagesError = action.error
//         },

//       }
// })


// export const { 
//     removeImage
// } = imagesSlice.actions;


// export default imagesSlice.reducer