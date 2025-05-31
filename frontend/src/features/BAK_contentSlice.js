import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabaseClient';
import { sortStrings, sortDescendentStrings, sortDescendentStringYears } from '../utils'; 

export const getContent = createAsyncThunk('content/getContent', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('content')
            .select('*')    
            .order('title', { ascending: true });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getContent()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getStatuses = createAsyncThunk('content/getStatuses', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('statuses')
            .select('*')
            .order('id', { ascending: true }); 

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getStatuses()-error');
        console.log(error);
        alert(error.message);
    };
});

export const createContent = createAsyncThunk('content/createContent', async ({ obj , navigate } , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('content')
            .insert([obj.contentData])
            .single()

        alert('Conteúdo criado com sucesso.');

        if(error) {
            throw error
        };  

        if(data) {
            const newContentCategories = {
                contentId: data.id,
                contentCategoriesData: obj.contentCategoriesData,
            };
            var dataId = data.id;
            dispatch(insertContentCategories(newContentCategories));
        };

        return data;

    } catch (error) {
        alert('createContent()-error')
        console.log(error)
        alert(error.message)
    } finally {
        const location = `/admin/content/edit/${dataId}`
        navigate(location);
    };
});

export const updateContent = createAsyncThunk('content/updateContent', async (obj , { dispatch, getState }) => {
    try { 
        const { content } = getState()
        const { data, error } = await supabase
            .from('content')
            .update(obj)
            .match({ id: obj.id })
            .single()
        
        const payload = content.content.map(p => {
            if(p.id === obj.id)
                return data;
            else 
                return p;
        });  

        alert('Conteúdo atualizado com sucesso.');
        
        if(error) {
            throw error
        }  

        return payload;

    } catch (error) {
        alert('updateContent()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getContentCategories = createAsyncThunk('content/getContentCategories', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('content_categories')
            .select('*')
            .order('id', { ascending: true }); 

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getContentCategories()-error');
        console.log(error);
        alert(error.message);
    };
});

export const refreshContentCategories = createAsyncThunk('content/refreshContentCategories', async (obj , { dispatch, getState }) => {
    try { 
        const { content } = getState();    

        const { error } = await supabase
            .from('content_categories')
            .delete()
            .match({ content_id: obj.contentId })
        
        if(error) {
            throw error
        }  

        const payload = content.content_categories.filter(cc => cc.content_id !== obj.contentId);  

        return payload;

    } catch (error) {
        alert('refreshContentCategories()-error')
        console.log(error)
        alert(error.message)
    } finally {
        dispatch(insertContentCategories(obj));
    };
});

export const insertContentCategories = createAsyncThunk('content/insertContentCategories', async (obj , { dispatch, getState }) => {
    try { 
        const { content } = getState();
        const newContentCategories = obj.contentCategoriesData.map(ccd => {
            return { content_id: obj.contentId, category_id: ccd.id }
        });

        const { data, error } = await supabase
            .from('content_categories')
            .insert(newContentCategories)
        
        const payload = [...content.content_categories, ...data];  
        
        if(error) {
            throw error
        }  

        return payload;

    } catch (error) {
        alert('insertContentCategories()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getContentVideos = createAsyncThunk('content/getContentVideos', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('content_videos')
            .select('*')
            .order('updated_at', { ascending: false }); 

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getContentVideos()-error');
        console.log(error);
        alert(error.message);
    };
});

export const createContentVideo = createAsyncThunk('content/createContentVideo', async ( obj, { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('content_videos')
            .insert([obj])
            .single()

        alert('Vídeo incluído com sucesso.');

        if(error) {
            throw error
        };  

        return data;

    } catch (error) {
        alert('createContentVideo()-error')
        console.log(error)
        alert(error.message)
    };
});

export const updateContentVideo = createAsyncThunk('content/updateContentVideo', async (obj , { dispatch, getState }) => {
    try { 
        //const { content } = getState()
        const { data, error } = await supabase
            .from('content_videos')
            .update(obj)
            .match({ id: obj.id })
            .single()
        
        // const payload = content.content_videos.map(cv => {
        //     if(cv.id === obj.id)
        //         return data;
        //     else 
        //         return cv;
        // });  

        //alert('Conteúdo atualizado com sucesso.');
        
        if(error) {
            throw error
        }  

        //return payload;

    } catch (error) {
        alert('updateContentVideo()-error')
        console.log(error)
        alert(error.message)
    };
});

export const deleteContentVideo = createAsyncThunk('research/deleteContentVideo', async (obj , { dispatch, getState }) => {
    try {     
        const { error } = await supabase
            .from('content_videos')
            .delete()
            .match({ id: obj.id })

        if (error) 
            throw error;

        dispatch(removeContentVideo(obj));    
        alert('Vídeo removido com sucesso.');

    } catch (error) {
        alert('deleteContentVideo()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getContentArticles = createAsyncThunk('content/getContentArticles', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('content_articles')
            .select('*')
            .order('updated_at', { ascending: false }); 

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getContentArticles()-error');
        console.log(error);
        alert(error.message);
    };
});

export const upsertContentArticle = createAsyncThunk('content/upsertContentArticle', async (obj , { dispatch, getState }) => {
    try { 
        const { content } = getState()
        const { data, error } = await supabase
            .from('content_articles')
            //.update(obj)
            .upsert({ id: obj.id, file_id: obj.file_id, content_id: obj.content_id })
            //.single()
        
        const payload = content.content_articles.map(ca => {
            if(ca.file_id === obj.file_id)
                return data;
            else 
                return ca;
        });  

        alert('Relação atualizada com sucesso.');
        
        if(error) {
            throw error
        }  

        return payload;

    } catch (error) {
        alert('upsertContentArticle()-error')
        console.log(error)
        alert(error.message)
    };
});

export const deleteContentArticle = createAsyncThunk('research/deleteContentArticle', async (obj , { dispatch, getState }) => {
    try {     
        const { error } = await supabase
            .from('content_articles')
            .delete()
            .match({ file_id: obj.file_id })

        if (error) 
            throw error;

        dispatch(removeContentArticle(obj));    
        alert('Relação removida com sucesso.');

    } catch (error) {
        alert('deleteContentArticle()-error')
        console.log(error)
        alert(error.message)
    };
});

export const contentSlice = createSlice({
    name: 'content',
    initialState: {
        content: [],
        statuses: [],
        
        mainDivSize: { x: 0, y: 0, width: 1168, height: 40, top: 0, right: 1168, bottom: 40, left: 0 },
        
        publicImageGalleryContainerSize: { x: 0, y: 0, width: 897, height: 554, top: 0, right: 1168, bottom: 40, left: 0 },

        publicFeaturedImageContainerSize: { x: 0, y: 0, width: 897, height: 554, top: 0, right: 1168, bottom: 40, left: 0 },

        mainImageIndex: 0,

        contentEditImageGallerySize: { x: 0, y: 0, width: 1168, height: 40, top: 0, right: 1168, bottom: 40, left: 0 },
        
        imageViewSize: { x: 0, y: 0, width: 500, height: 500, top: 0, right: 500, bottom: 500, left: 0 },

        getContentStatus: 'idle',
        getContentError: null,

        getStatusesStatus: 'idle',
        getStatusesError: null,

        createContentStatus: 'idle',
        createContentError: null,

        updateContentStatus: 'idle',
        updateContentError: null,

        content_categories: [],

        getContentCategoriesStatus: 'idle',
        getContentCategoriesError: null,

        refreshContentCategoriesStatus: 'idle',
        refreshContentCategoriesError: null,

        insertContentCategoriesStatus: 'idle',
        insertContentCategoriesError: null,

        content_videos: [],

        getContentVideosStatus: 'idle',
        getContentVideosError: null,

        createContentVideoStatus: 'idle',
        createContentVideoError: null,

        updateContentVideoStatus: 'idle',
        updateContentVideoError: null,

        deleteContentVideoStatus: 'idle',
        deleteContentVideoError: null,

        content_articles: [],

        getContentArticlesStatus: 'idle',
        getContentArticlesError: null,

        upsertContentArticleStatus: 'idle',
        upsertContentArticleError: null,

        deleteContentArticleStatus: 'idle',
        deleteContentArticleError: null,

        related_content: [
            { id: 1, name: 'Vídeos'},
            { id: 2, name: 'Bibliografia'},
            { id: 3, name: 'Textos da Artista'},
            { id: 4, name: 'Publicações'},
            { id: 5, name: 'Clipping'},
        ],

    },
    reducers: {
        updateMainDivSize(state, action) { 
            state.mainDivSize = action.payload;
        },
        updatePublicFeaturedImageContainerSize(state, action) { 
            state.publicFeaturedImageContainerSize = action.payload;
        },
        updatePublicImageGalleryContainerSize(state, action) { 
            state.publicImageGalleryContainerSize = action.payload;
        },
        updateContentEditImageGallerySize(state, action) { 
            state.contentEditImageGallerySize = action.payload;
        },
        updateImageViewSize(state, action) { 
            state.imageViewSize = action.payload;
        },
        updateMainImageIndex(state, action) { 
            state.mainImageIndex = action.payload;
        },
        updateContentVideos(state, action) { 
            state.content_videos = action.payload;
        },
        removeContentVideo(state, action) { 
            const newContentVideos = state.content_videos.filter(cv => cv.id !== action.payload.id);
            state.content_videos = newContentVideos;
        },
        removeContentArticle(state, action) { 
            const newContentArticles = state.content_articles.filter(ca => ca.file_id !== action.payload.file_id);
            state.content_articles = newContentArticles;
        },  
    },
    extraReducers: {
        [getContent.pending]: (state) => {
            state.getContentStatus = 'loading'
        },
        [getContent.fulfilled]: (state, action) => {
            state.content = action.payload
            state.getContentStatus = 'succeeded'
        },
        [getContent.rejected]: (state, action) => {
          state.getContentStatus = 'failed'
          state.getContentError = action.error
        },

        [getStatuses.pending]: (state) => {
            state.getStatusesStatus = 'loading'
        },
        [getStatuses.fulfilled]: (state, action) => {
            state.statuses = action.payload
            state.getStatusesStatus = 'succeeded'
        },
        [getStatuses.rejected]: (state, action) => {
          state.getStatusesStatus = 'failed'
          state.getStatusesError = action.error
        },

        [createContent.pending]: (state) => {
            state.createContentStatus = 'loading'
        },
        [createContent.fulfilled]: (state, action) => {
            state.content.unshift(action.payload)
            state.createContentStatus = 'succeeded'
        },
        [createContent.rejected]: (state, action) => {
          state.createContentStatus = 'failed'
          state.createContentError = action.error
        },

        [updateContent.pending]: (state) => {
            state.updateContentStatus = 'loading'
        },
        [updateContent.fulfilled]: (state, action) => {
            state.content = action.payload
            state.updateContentStatus = 'succeeded'
        },
        [updateContent.rejected]: (state, action) => {
          state.updateContentStatus = 'failed'
          state.updateContentError = action.error
        },

        [getContentCategories.pending]: (state) => {
            state.getContentCategoriesStatus = 'loading'
        },
        [getContentCategories.fulfilled]: (state, action) => {
            state.content_categories = action.payload
            state.getContentCategoriesStatus = 'succeeded'
        },
        [getContentCategories.rejected]: (state, action) => {
          state.getContentCategoriesStatus = 'failed'
          state.getContentCategoriesError = action.error
        },

        [refreshContentCategories.pending]: (state) => {
            state.refreshContentCategoriesStatus = 'loading'
        },
        [refreshContentCategories.fulfilled]: (state, action) => {
            state.content_categories = action.payload
            state.refreshContentCategoriesStatus = 'succeeded'
        },
        [refreshContentCategories.rejected]: (state, action) => {
          state.refreshContentCategoriesStatus = 'failed'
          state.refreshContentCategoriesError = action.error
        },

        [insertContentCategories.pending]: (state) => {
            state.insertContentCategoriesStatus = 'loading'
        },
        [insertContentCategories.fulfilled]: (state, action) => {
            state.content_categories = action.payload
            state.insertContentCategoriesStatus = 'succeeded'
        },
        [insertContentCategories.rejected]: (state, action) => {
          state.insertContentCategoriesStatus = 'failed'
          state.insertContentCategoriesError = action.error
        },

        [getContentVideos.pending]: (state) => {
            state.getContentVideosStatus = 'loading'
        },
        [getContentVideos.fulfilled]: (state, action) => {
            state.content_videos = action.payload
            state.getContentVideosStatus = 'succeeded'
        },
        [getContentVideos.rejected]: (state, action) => {
          state.getContentVideosStatus = 'failed'
          state.getContentVideosError = action.error
        },

        [createContentVideo.pending]: (state) => {
            state.createContentVideoStatus = 'loading'
        },
        [createContentVideo.fulfilled]: (state, action) => {
            state.content_videos.unshift(action.payload)
            state.createContentVideoStatus = 'succeeded'
        },
        [createContentVideo.rejected]: (state, action) => {
          state.createContentVideoStatus = 'failed'
          state.createContentVideoError = action.error
        },

        [updateContentVideo.pending]: (state) => {
            state.updateContentVideoStatus = 'loading'
        },
        [updateContentVideo.fulfilled]: (state, action) => {
            //state.content_videos = action.payload
            state.updateContentVideoStatus = 'succeeded'
        },
        [updateContentVideo.rejected]: (state, action) => {
          state.updateContentVideoStatus = 'failed'
          state.updateContentVideoError = action.error
        },

        [deleteContentVideo.pending]: (state) => {
            state.deleteContentVideoStatus = 'loading'
        },
        [deleteContentVideo.fulfilled]: (state, action) => {
            //state.content_videos = action.payload
            state.deleteContentVideoStatus = 'succeeded'
        },
        [deleteContentVideo.rejected]: (state, action) => {
          state.deleteContentVideoStatus = 'failed'
          state.deleteContentVideoError = action.error
        },

        [getContentArticles.pending]: (state) => {
            state.getContentArticlesStatus = 'loading'
        },
        [getContentArticles.fulfilled]: (state, action) => {
            state.content_articles = action.payload
            state.getContentArticlesStatus = 'succeeded'
        },
        [getContentArticles.rejected]: (state, action) => {
          state.getContentArticlesStatus = 'failed'
          state.getContentArticlesError = action.error
        },

        [upsertContentArticle.pending]: (state) => {
            state.upsertContentArticleStatus = 'loading'
        },
        [upsertContentArticle.fulfilled]: (state, action) => {
            state.content_articles = action.payload
            state.upsertContentArticleStatus = 'succeeded'
        },
        [upsertContentArticle.rejected]: (state, action) => {
          state.upsertContentArticleStatus = 'failed'
          state.upsertContentArticleError = action.error
        },

        [deleteContentArticle.pending]: (state) => {
            state.deleteContentArticleStatus = 'loading'
        },
        [deleteContentArticle.fulfilled]: (state, action) => {
            //state.content_videos = action.payload
            state.deleteContentArticleStatus = 'succeeded'
        },
        [deleteContentArticle.rejected]: (state, action) => {
          state.deleteContentArticleStatus = 'failed'
          state.deleteContentArticleError = action.error
        },
      }
});

// SELECTOR OF HOME FEATURED IMAGES 
export const selectVideosCategories  = state => {
    if ( state.content.getContentVideosStatus === 'succeeded' ) {
        const contentVideos = state.content.content_videos;
        const videosCategories = contentVideos.map(cv => { return cv.category }); 

        const uniqueCategories = videosCategories.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []); 

        return uniqueCategories.sort(sortStrings); 
    }

    return null;
};

// SELECTOR OF HOME FEATURED IMAGES 
export const selectContentYears  = state => {
    if ( state.content.getContentStatus === 'succeeded' ) {
        const content = state.content.content.filter(c => c.status === 1);
        const contentYears = content.map(cy => { 
            if (cy.date.interval) {
                return { 
                    start: cy.date.start.year,
                    end: cy.date.end.year,
                    interval: cy.date.interval,
                    string: `${cy.date.start.year} a ${cy.date.end.year}`
                };
            } else
                return { 
                    start: cy.date.start.year,
                    end: cy.date.end.year,
                    interval: cy.date.interval,
                    string: `${cy.date.start.year}`
                }; 
        }); 

        const uniqueCategories = contentYears.reduce((uniqueArr, current) => {
            if (uniqueArr.filter(e => e.string === current.string).length === 0) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []); 

        // const uniqueCategories = contentYears.reduce((uniqueArr, current) => {
        //     if (!uniqueArr.includes(current)) {
        //         uniqueArr.push(current);
        //     }

        //     return uniqueArr;
        // }, []); 

        return uniqueCategories.sort(sortDescendentStringYears); 
    }

    return null;
};

// SELECTOR OF HOME FEATURED IMAGES 
export const selectVideosYears  = state => {
    if ( state.content.getContentVideosStatus === 'succeeded' ) {
        const contentVideos = state.content.content_videos;
        const videosYears = contentVideos.map(cv => { return cv.date.year }); 

        const uniqueCategories = videosYears.reduce((uniqueArr, current) => {
            if (!uniqueArr.includes(current)) {
                uniqueArr.push(current);
            }

            return uniqueArr;
        }, []); 

        return uniqueCategories.sort(sortDescendentStrings); 
    }

    return null;
};

export const { 
    updateMainDivSize,
    updatePublicImageGalleryContainerSize,
    updatePublicFeaturedImageContainerSize,
    updateContentEditImageGallerySize,
    updateImageViewSize,
    updateMainImageIndex,
    updateContentVideos,
    removeContentVideo, 
    removeContentArticle
} = contentSlice.actions

export default contentSlice.reducer