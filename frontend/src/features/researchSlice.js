import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabaseClient';

export const getResearch = createAsyncThunk('research/getResearch', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('research')
            .select(`
                *,
                category:category_id ( 
                    *,
                    id
                )
            `)    
            
            .order('updated_at', { ascending: false });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getResearch()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getCategories = createAsyncThunk('research/getCategories', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('categories')
            .select(`
                *,
                classes ( 
                    *,
                    id
                )
            `)
            .order('updated_at', { ascending: false });

        if (error) 
            throw error;
        
        // ADD filteredTags FIELD TO USE IN PUBLIC FILTER SELECTIONS (FilterSelect.js)
        const newCategories = data.map(c => { return {...c, filteredTags: []}} );

        return newCategories;

    } catch (error) {
        alert('getCategories()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getStatuses = createAsyncThunk('research/getStatuses', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('statuses')
            .select('*')
            .order('id', { ascending: true }); 

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getStatus()-error');
        console.log(error);
        alert(error.message);
    };
});

export const updateResearch = createAsyncThunk('research/updateResearch', async (obj , { dispatch, getState }) => {
    try { 
        const { research } = getState()
        const category = research.categories.find(c => c.id === obj.category_id)
        const { data, error } = await supabase
            .from('research')
            .update(obj)
            .match({ id: obj.id })
            .single()

        
        const payload = research.research.map(r => {
            if(r.id === obj.id)
                return {...data, category: category};
            else 
                return r;
        });  
        alert('Pesquisa atualizada com sucesso.');
        if(error) {
            throw error
        }  

        return payload;
    } catch (error) {
        alert('updateResearch()-error')
        console.log(error)
        alert(error.message)
    };
});

export const createResearch = createAsyncThunk('research/createResearch', async ({ obj , navigate } , { dispatch, getState }) => {
    try { 
        const { research } = getState()
        const category = research.categories.find(c => c.id === obj.category_id)
        const { data, error } = await supabase
            .from('research')
            .insert([obj.researchData])
            .single();

        if(data) {
            const newResearchTags = {
                researchId: data.id,
                researchTagsData: obj.researchTagsData,
            };
            var dataId = data.id;
            alert('Pesquisa criada com sucesso.');
            dispatch(insertResearchTags(newResearchTags));
        };    

        if(error) {
            throw error
        };
        
        return { ...data, category: category };
    } catch (error) {
        alert('createResearch()-error')
        console.log(error)
        alert(error.message)
    } finally {
        const location = `/admin/research/edit/${dataId}`
        navigate(location);
    };
});

export const getAuthors = createAsyncThunk('research/getAuthors', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('authors')
            .select('*')    
            
            .order('name', { ascending: true });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getAuthors()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getResearchAuthors = createAsyncThunk('research/getResearchAuthors', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('research_authors')
            .select(`
                *,
                research_source:research_id ( 
                    *,
                    id
                ),
                author:author_id ( 
                    *,
                    id
                )
            `)    
            
            .order('updated_at', { ascending: false });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getResearchAuthors()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getSources = createAsyncThunk('research/getSources', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('sources')
            .select(`
                *,
                research_source:source_id ( 
                    *,
                    id
                ),
                research_target:target_id ( 
                    *,
                    id
                )
            `)   
            .order('updated_at', { ascending: false });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getSources()-error')
        console.log(error)
        alert(error.message)
    };
});

export const addSource = createAsyncThunk('research/addSource', async (obj , { dispatch, getState }) => {
    try {     
        const { data, error } = await supabase
            .from('sources')
            .upsert({ source_id: obj.source_id, target_id: obj.target_id }, { ignoreDuplicates: true })
            .single()

        if (error) 
            throw error;
        const { research } = getState();
        const newData = {
            ...data,
            research_source: research.research.find(r => r.id === data.source_id),
            research_target: research.research.find(r => r.id === data.target_id),
        }     
        
        return newData;

    } catch (error) {
        alert('addSource()-error')
        console.log(error)
        alert(error.message)
    };
});

export const deleteSource = createAsyncThunk('research/deleteSource', async (obj , { dispatch, getState }) => {
    try {     
        const { error } = await supabase
            .from('sources')
            .delete()
            .match({ id: obj.id })

        if (error) 
            throw error;

    } catch (error) {
        alert('deleteSource()-error')
        console.log(error)
        alert(error.message)
    };
});

export const addResearchAuthor = createAsyncThunk('research/addResearchAuthor', async (obj , { dispatch, getState }) => {
    try {     
        const { data, error } = await supabase
            .from('research_authors')
            .upsert({ author_id: obj.author_id, research_id: obj.research_id }, { ignoreDuplicates: true })
            .single()

        if (error) 
            throw error;
        const { research } = getState();
        const newData = {
            ...data,
            author: research.authors.find(a => a.id === data.author_id),
            research_source: research.research.find(r => r.id === data.research_id),
        }     
        
        return newData;

    } catch (error) {
        alert('addResearchAuthor()-error')
        console.log(error)
        alert(error.message)
    };
});

export const deleteResearchAuthor = createAsyncThunk('research/deleteResearchAuthor', async (obj , { dispatch, getState }) => {
    try {     
        const { error } = await supabase
            .from('research_authors')
            .delete()
            .match({ id: obj.id })

        if (error) 
            throw error;

    } catch (error) {
        alert('deleteResearchAuthor()-error')
        console.log(error)
        alert(error.message)
    };
});

export const createAuthor = createAsyncThunk('research/createAuthor', async (obj , { dispatch, getState }) => {
    try {     
        const { data, error } = await supabase
            .from('authors')
            .upsert(obj, { ignoreDuplicates: true })
            .single()

        if (error) 
            throw error;
        
        return data;

    } catch (error) {
        alert('addSource()-error')
        console.log(error)
        alert(error.message)
    };
});

export const deleteAuthor = createAsyncThunk('research/deleteAuthor', async (obj , { dispatch, getState }) => {
    try {     
        const { error } = await supabase
            .from('authors')
            .delete()
            .match({ id: obj.id })

        if (error) 
            throw error;
          
        dispatch(removeAuthor(obj)); 

    } catch (error) {
        alert('deleteResearchAuthor()-error')
        console.log(error)
        alert(error.message)
    };
});

export const updateAuthor = createAsyncThunk('research/updateAuthor', async (obj , { dispatch, getState }) => {
    try {  
        console.log('thunk', obj);
        const { data, error } = await supabase
            .from('authors')
            .update(obj)
            .match({ id: obj.id })
            .single()

        if (error) 
            throw error; 

        const { research } = getState();
        const authors = research.authors.filter(a => a.id !== obj.id);
        const newData = [data, ...authors]    
        
        return newData;

    } catch (error) {
        alert('upsertAuthor()-error')
        console.log(error)
        alert(error.message)
    };
});

export const addClass = createAsyncThunk('research/addClass', async (obj , { dispatch, getState }) => {
    try {     
        const { data, error } = await supabase
            .from('classes')
            .upsert({ category_id: obj.category_id, name: obj.name }, { ignoreDuplicates: true })
            .single();
  
        if (error) 
            throw error;

        //const { research } = getState();

        // const updatedCategoryClasses = research.categories.map(c => {
        //     if(c.id === obj.category_id) {
        //         let newClasses = [...c.classes, data] //TODO DESMEMBRAR CLASSES 
        //         return {...c, classes: newClasses};
        //     }
        //     else 
        //         return c;
        // }); 
        
        return data;

    } catch (error) {
        alert('addClass()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getClasses = createAsyncThunk('research/getClasses', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('classes')
            .select('*')   
            .order('name', { ascending: true });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getClasses()-error')
        console.log(error)
        alert(error.message)
    };
});

export const updateClass = createAsyncThunk('research/updateClass', async (obj , { dispatch, getState }) => {
    try {  
        const { research } = getState();
        const updatedClass = research.classes.find(rc => rc.id === obj);

        const { error } = await supabase
            .from('classes')
            .update(updatedClass, {
                returning: 'minimal'
            })
            .match({ id: obj });
        alert('updateClass()-Success');

        if (error) 
            throw error; 

    } catch (error) {
        alert('updateClass()-Error');
        console.log(error);
        alert(error.message);
    };
});

export const updateClassTags = createAsyncThunk('research/updateClassTags', async (obj , { dispatch, getState }) => {
    try {  
        const { research } = getState();
        const updatedClassTags = research.tags.filter(rt => rt.class_id === obj);

        const { error } = await supabase
            .from('tags')
            .upsert(updatedClassTags, {
                returning: 'minimal'
            });
        alert('updateClass()-Success');

        if (error) 
            throw error; 

    } catch (error) {
        alert('updateClass()-Error');
        console.log(error);
        alert(error.message);
    };
});

export const deleteClass = createAsyncThunk('research/deleteClass', async (obj , { dispatch, getState }) => {
    try {     
        const { error } = await supabase
            .from('classes')
            .delete()
            .match({ id: obj.id })

        if (error) 
            throw error;
          
        dispatch(removeClass(obj)); 

    } catch (error) {
        alert('deleteClass()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getTags = createAsyncThunk('research/getTags', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('tags')
            .select(`
                *,
                class:class_id ( 
                    *,
                    id
                )
            `)
            .order('name', { ascending: false });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getTags()-error')
        console.log(error)
        alert(error.message)
    };
});

export const addTag = createAsyncThunk('research/addTag', async (obj , { dispatch, getState }) => {
    try {     
        const { data, error } = await supabase
            .from('tags')
            .upsert({ class_id: obj.class_id, name: obj.name }, { ignoreDuplicates: true })
            .single();
  
        if (error) 
            throw error;
        
        return data;

    } catch (error) {
        alert('addTag()-error')
        console.log(error)
        alert(error.message)
    };
});

export const deleteTag = createAsyncThunk('research/deleteTag', async (obj , { dispatch, getState }) => {
    try {     
        const { error } = await supabase
            .from('tags')
            .delete()
            .match({ id: obj.id })

        if (error) 
            throw error;
          
        dispatch(removeTag(obj)); 
        alert('deleteTag()-success - Tag removida com sucesso');

    } catch (error) {
        alert('deleteTag()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getResearchTags = createAsyncThunk('content/getResearchTags', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('research_tags')
            .select('*')
            .order('id', { ascending: true }); 

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getResearchTags()-error');
        console.log(error);
        alert(error.message);
    };
});

export const refreshResearchTags = createAsyncThunk('content/refreshResearchTags', async (obj , { dispatch, getState }) => {
    try { 
        const { research } = getState();    

        const { error } = await supabase
            .from('research_tags')
            .delete()
            .match({ research_id: obj.researchId })
        
        if(error) {
            throw error
        }  

        const payload = research.research_tags.filter(rt => rt.research_id !== obj.researchId);  

        return payload;

    } catch (error) {
        alert('refreshResearchTags()-error')
        console.log(error)
        alert(error.message)
    } finally {
        dispatch(insertResearchTags(obj));
    };
});

export const insertResearchTags = createAsyncThunk('content/insertResearchTags', async (obj , { dispatch, getState }) => {
    try { 
        const { research } = getState();
        const newResearchTags = obj.researchTagsData.map(rtd => {
            return { research_id: obj.researchId, tag_id: rtd.id }
        });

        const { data, error } = await supabase
            .from('research_tags')
            .insert(newResearchTags)
        
        const payload = [...research.research_tags, ...data];  
        
        if(error) {
            throw error
        }  

        return payload;

    } catch (error) {
        alert('insertResearchTags()-error')
        console.log(error)
        alert(error.message)
    };
});

export const researchSlice = createSlice({
    name: 'research',
    initialState: {
        newResearchCategory: { category_id: 1, color: '#3d85c6' },
        research: [],
        categories: [],
        statuses: [],
        authors: [],
        researchAuthors: [],
        sources: [],
        classes: [],
        tags: [],
        research_tags: [],
        researchSearchInput: '',
                
        getResearchStatus: 'idle',
        getResearchError: null,

        updateResearchStatus: 'idle',
        updateResearchError: null,

        createResearchStatus: 'idle',
        createResearchError: null,

        getCategoriesStatus: 'idle',
        getCategoriesError: null,

        getStatusesStatus: 'idle',
        getStatusesError: null,
        
        getAuthorsStatus: 'idle',
        getAuthorsError: null,

        createAuthorsStatus: 'idle',
        createAuthorsError: null,

        upsertAuthorsStatus: 'idle',
        upsertAuthorsError: null,

        deleteAuthorsStatus: 'idle',
        deleteAuthorsError: null,

        getResearchAuthorsStatus: 'idle',
        getResearchAuthorsError: null,

        getSourcesStatus: 'idle',
        getSourcesError: null,

        addSourceStatus: 'idle',
        addSourceError: null,

        deleteSourceStatus: 'idle',
        deleteSourceError: null,

        deleteResearchAuthorStatus: 'idle',
        deleteResearchAuthorError: null,

        addClassStatus: 'idle',
        addClassError: null,

        getClassesStatus: 'idle',
        getClassesError: null,

        updateClassStatus: 'idle',
        updateClassError: null,

        deleteClassStatus: 'idle',
        deleteClassError: null,

        getTagsStatus: 'idle',
        getTagsError: null,

        updateClassTagsStatus: 'idle',
        updateClassTagsError: null,

        addTagStatus: 'idle',
        addTagError: null,

        deleteTagStatus: 'idle',
        deleteTagError: null,

        getResearchTagsStatus: 'idle',
        getResearchTagsError: null,

        refreshResearchTagsStatus: 'idle',
        refreshResearchTagsError: null,

        insertResearchTagsStatus: 'idle',
        insertResearchTagsError: null,

    },
    reducers: {
        updateClassName: {
            reducer(state, action) {
                const newstate = state.classes.map(c => {
                    if(c.id !== action.payload.id) 
                        return c;
                    else {
                        const newclass = {
                            ...c, 
                            name: action.payload.name
                        }
                        return newclass;   
                    } 
                }) 
                return {
                    ...state,
                    classes: newstate,
                }  
            },
            prepare({id, name}) {
                return {
                    payload: {
                        id,
                        name
                    }
                }
            }
        },
        updateTagsNames: {
            reducer(state, action) {
                const newstate = state.tags.map(t => {
                    if(t.id !== action.payload.id) 
                        return t;
                    else {
                        const newtag = {
                            ...t, 
                            name: action.payload.name
                        }
                        return newtag;   
                    } 
                }) 
                return {
                    ...state,
                    tags: newstate,
                }  
            },
            prepare({id, name}) {
                return {
                    payload: {
                        id,
                        name
                    }
                }
            }
        },
        removeSource(state, action) { 
            const newSources = state.sources.filter(s => s.id !== action.payload.id);
            state.sources = newSources;
        },
        removeResearchAuthor(state, action) { 
            const newResearchAuthors = state.researchAuthors.filter(ra => ra.id !== action.payload.id);
            state.researchAuthors = newResearchAuthors;
        },
        removeAuthor(state, action) { 
            const newAuthors = state.authors.filter(a => a.id !== action.payload.id);
            state.authors = newAuthors;
        },
        removeClass(state, action) { 
            const newClasses = state.classes.filter(c => c.id !== action.payload.id);
            state.classes = newClasses;
        },
        removeTag(state, action) { 
            const newTags = state.tags.filter(t => t.id !== action.payload.id);
            state.tags = newTags;
        },
        setResearchSearchInput(state, action) { 
            //const newClasses = state.classes.filter(c => c.id !== action.payload.id);
            state.researchSearchInput = action.payload;
        },
        updateCategories(state, action) { 
            state.categories = action.payload;
        },
        
    },
    extraReducers: {
        [getResearch.pending]: (state) => {
            state.getResearchStatus = 'loading'
        },
        [getResearch.fulfilled]: (state, action) => {
            state.research = action.payload
            state.getResearchStatus = 'succeeded'
        },
        [getResearch.rejected]: (state, action) => {
          state.getResearchStatus = 'failed'
          state.getResearchError = action.error
        },

        [getCategories.pending]: (state) => {
            state.getCategoriesStatus = 'loading'
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categories = action.payload
            state.getCategoriesStatus = 'succeeded'
        },
        [getCategories.rejected]: (state, action) => {
          state.getCategoriesStatus = 'failed'
          state.getCategoriesError = action.error
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

        [updateResearch.pending]: (state) => {
            state.updateResearchStatus = 'loading'
        },
        [updateResearch.fulfilled]: (state, action) => {
            state.research = action.payload
            state.updateResearchStatus = 'succeeded'
        },
        [updateResearch.rejected]: (state, action) => {
          state.updateResearchStatus = 'failed'
          state.updateResearchError = action.error
        },

        [createResearch.pending]: (state) => {
            state.createResearchStatus = 'loading'
        },
        [createResearch.fulfilled]: (state, action) => {
            state.research.unshift(action.payload)
            state.createResearchStatus = 'succeeded'
        },
        [createResearch.rejected]: (state, action) => {
          state.createResearchStatus = 'failed'
          state.createResearchError = action.error
        },

        [getAuthors.pending]: (state) => {
            state.getAuthorsStatus = 'loading'
        },
        [getAuthors.fulfilled]: (state, action) => {
            state.authors = action.payload
            state.getAuthorsStatus = 'succeeded'
        },
        [getAuthors.rejected]: (state, action) => {
          state.getAuthorsStatus = 'failed'
          state.getAuthorsError = action.error
        },

        [getResearchAuthors.pending]: (state) => {
            state.getResearchAuthorsStatus = 'loading'
        },
        [getResearchAuthors.fulfilled]: (state, action) => {
            state.researchAuthors = action.payload
            state.getResearchAuthorsStatus = 'succeeded'
        },
        [getResearchAuthors.rejected]: (state, action) => {
          state.getResearchAuthorsStatus = 'failed'
          state.getResearchAuthorsError = action.error
        },

        [getSources.pending]: (state) => {
            state.getSourcesStatus = 'loading'
        },
        [getSources.fulfilled]: (state, action) => {
            state.sources = action.payload
            state.getSourcesStatus = 'succeeded'
        },
        [getSources.rejected]: (state, action) => {
          state.getSourcesStatus = 'failed'
          state.getSourcesError = action.error
        },

        [addSource.pending]: (state) => {
            state.addSourceStatus = 'loading'
        },
        [addSource.fulfilled]: (state, action) => {
            state.sources.unshift(action.payload)
            state.addSourceStatus = 'succeeded'
        },
        [addSource.rejected]: (state, action) => {
          state.addSourceStatus = 'failed'
          state.addSourceError = action.error
        },

        [deleteSource.pending]: (state) => {
            state.deleteSourceStatus = 'loading'
        },
        [deleteSource.fulfilled]: (state, action) => {
            state.deleteSourceStatus = 'succeeded'
        },
        [deleteSource.rejected]: (state, action) => {
          state.deleteSourceStatus = 'failed'
          state.deleteSourceError = action.error
        },

        [addResearchAuthor.pending]: (state) => {
            state.addResearchAuthorStatus = 'loading'
        },
        [addResearchAuthor.fulfilled]: (state, action) => {
            state.researchAuthors.unshift(action.payload)
            state.addResearchAuthorStatus = 'succeeded'
        },
        [addResearchAuthor.rejected]: (state, action) => {
          state.addResearchAuthorStatus = 'failed'
          state.addResearchAuthorError = action.error
        },

        [deleteResearchAuthor.pending]: (state) => {
            state.deleteResearchAuthorStatus = 'loading'
        },
        [deleteResearchAuthor.fulfilled]: (state, action) => {
            state.deleteResearchAuthorStatus = 'succeeded'
        },
        [deleteResearchAuthor.rejected]: (state, action) => {
          state.deleteResearchAuthorStatus = 'failed'
          state.deleteResearchAuthorError = action.error
        },

        [createAuthor.pending]: (state) => {
            state.createAuthorStatus = 'loading'
        },
        [createAuthor.fulfilled]: (state, action) => {
            state.authors.unshift(action.payload)
            state.createAuthorStatus = 'succeeded'
        },
        [createAuthor.rejected]: (state, action) => {
          state.createAuthorStatus = 'failed'
          state.createAuthorError = action.error
        },

        [deleteAuthor.pending]: (state) => {
            state.deleteAuthorsStatus = 'loading'
        },
        [deleteAuthor.fulfilled]: (state, action) => {
            state.deleteAuthorsStatus = 'succeeded'
        },
        [deleteAuthor.rejected]: (state, action) => {
          state.deleteAuthorsStatus = 'failed'
          state.deleteAuthorsError = action.error
        },

        [updateAuthor.pending]: (state) => {
            state.updateAuthorsStatus = 'loading'
        },
        [updateAuthor.fulfilled]: (state, action) => {
            state.authors = action.payload
            state.updateAuthorsStatus = 'succeeded'
        },
        [updateAuthor.rejected]: (state, action) => {
          state.updateAuthorsStatus = 'failed'
          state.updateAuthorsError = action.error
        },

        [addClass.pending]: (state) => {
            state.addClassStatus = 'loading'
        },
        [addClass.fulfilled]: (state, action) => {
            state.classes.unshift(action.payload)
            state.addClassStatus = 'succeeded'
        },
        [addClass.rejected]: (state, action) => {
          state.addClassStatus = 'failed'
          state.addClassError = action.error
        },

        [getClasses.pending]: (state) => {
            state.getClassesStatus = 'loading'
        },
        [getClasses.fulfilled]: (state, action) => {
            state.classes = action.payload
            state.getClassesStatus = 'succeeded'
        },
        [getClasses.rejected]: (state, action) => {
          state.getClassesStatus = 'failed'
          state.getClassesError = action.error
        },

        [updateClass.pending]: (state) => {
            state.updateClassStatus = 'loading'
        },
        [updateClass.fulfilled]: (state, action) => {
            state.updateClassStatus = 'succeeded'
        },
        [updateClass.rejected]: (state, action) => {
          state.updateClassStatus = 'failed'
          state.updateClassError = action.error
        },

        [updateClassTags.pending]: (state) => {
            state.updateClassTagsStatus = 'loading'
        },
        [updateClassTags.fulfilled]: (state, action) => {
            state.updateClassTagsStatus = 'succeeded'
        },
        [updateClassTags.rejected]: (state, action) => {
          state.updateClassTagsStatus = 'failed'
          state.updateClassTagsError = action.error
        },

        [deleteClass.pending]: (state) => {
            state.deleteClassStatus = 'loading'
        },
        [deleteClass.fulfilled]: (state, action) => {
            state.deleteClassStatus = 'succeeded'
        },
        [deleteClass.rejected]: (state, action) => {
          state.deleteClassStatus = 'failed'
          state.deleteClassError = action.error
        },

        [getTags.pending]: (state) => {
            state.getTagsStatus = 'loading'
        },
        [getTags.fulfilled]: (state, action) => {
            state.tags = action.payload
            state.getTagsStatus = 'succeeded'
        },
        [getTags.rejected]: (state, action) => {
          state.getTagsStatus = 'failed'
          state.getTagsError = action.error
        },

        [addTag.pending]: (state) => {
            state.addTagStatus = 'loading'
        },
        [addTag.fulfilled]: (state, action) => {
            state.tags.unshift(action.payload)
            state.addTagStatus = 'succeeded'
        },
        [addTag.rejected]: (state, action) => {
          state.addTagStatus = 'failed'
          state.addTagError = action.error
        },

        [deleteTag.pending]: (state) => {
            state.deleteTagStatus = 'loading'
        },
        [deleteTag.fulfilled]: (state, action) => {
            state.deleteTagStatus = 'succeeded'
        },
        [deleteTag.rejected]: (state, action) => {
          state.deleteTagStatus = 'failed'
          state.deleteTagError = action.error
        },

        [getResearchTags.pending]: (state) => {
            state.getResearchTagsStatus = 'loading'
        },
        [getResearchTags.fulfilled]: (state, action) => {
            state.research_tags = action.payload
            state.getResearchTagsStatus = 'succeeded'
        },
        [getResearchTags.rejected]: (state, action) => {
          state.getResearchTagsStatus = 'failed'
          state.getResearchTagsError = action.error
        },

        [refreshResearchTags.pending]: (state) => {
            state.refreshResearchTagsStatus = 'loading'
        },
        [refreshResearchTags.fulfilled]: (state, action) => {
            state.research_tags = action.payload
            state.refreshResearchTagsStatus = 'succeeded'
        },
        [refreshResearchTags.rejected]: (state, action) => {
          state.refreshResearchTagsStatus = 'failed'
          state.refreshResearchTagsError = action.error
        },

        [insertResearchTags.pending]: (state) => {
            state.insertResearchTagsStatus = 'loading'
        },
        [insertResearchTags.fulfilled]: (state, action) => {
            state.research_tags = action.payload
            state.insertResearchTagsStatus = 'succeeded'
        },
        [insertResearchTags.rejected]: (state, action) => {
          state.insertResearchTagsStatus = 'failed'
          state.insertResearchTagsError = action.error
        },

      }
})

// FILTERED RESEARCH SELECTOR 
export const selectFilteredResearch  = state => {
    // SET RESEARCH TAGS
    const classes = state.research.classes;
    const tags = state.research.tags;

    const allResearchTags = state.research.research.map(art => {

        const researchTags = state.research.research_tags.filter(rt => rt.research_id === art.id ); 
        const researchTagsIds = researchTags.map(t => {if(t.tag_id) return t.tag_id} ); 
        const researchTagsData = tags.filter(rtd => researchTagsIds.includes(rtd.id)); 
        const researchClassesIds = researchTagsData.map(rtd => {if(rtd.class_id) return rtd.class_id} ); 
        const researchClassesData = classes.filter(cl => researchClassesIds.includes(cl.id)); 

        return ({ 
            research_id: art.id, 
            researchClassesData: researchClassesData,
            researchTagsData: researchTagsData
        });
    });

    // FILTER PUBLISHED STATUS
    const publishedResearch = state.research.research.filter(r => r.status === 1);

    // SET GEOLOCATION
    const geolocatedResearch = publishedResearch.map(pr => {
        const geolocatedresearch = { ...pr, coordinates: [pr.geolocation.longitude,pr.geolocation.latitude] };

        return geolocatedresearch;
    }); 

    // INSERT CLASSES AND TAGS IN PUBLIC GEOLOCATED RESEARCH
    const taggedFilteredResearch = geolocatedResearch.map(fr => {
        const researchTags = allResearchTags.find(art => art.research_id === fr.id ); 

        return ({ 
            ...fr,
            researchTags: researchTags
        });
    }); 
 
    return { filteredResearch: taggedFilteredResearch, allResearchTags: allResearchTags }; 
 };

// SEARCHED RESEARCH SELECTOR 
export const selectSearchedResearch  = state => {

    // FILTER PUBLISHED STATUS
    const publishedResearch = state.research.research.filter(r => r.status === 1);

    // SET CATEGORY NAMES
    const categoryNameResearch = publishedResearch.map(pr => {
        const categorynameresearch = { ...pr, categoryName: state.research.categories.find(c => c.id === pr.category_id).name };

        return categorynameresearch;
    }); 

    // FILTER SEARCHED ITEMS
    const searchedResearch = categoryNameResearch.filter((r) => {
        return Object.values(r).join('').toLowerCase().includes(state.research.researchSearchInput.toLowerCase());
    });   
 
    if(state.research.researchSearchInput === '')
        return publishedResearch;
    else
        return searchedResearch;
};

export const selectResearchSources  = state => {
    const researchSources = state.research.research.map(rr => {
        const researchsources = state.research.sources.filter(rs => rs.target_id === rr.id);
        const researchtargets = state.research.sources.filter(rs => rs.source_id === rr.id);
        const researchauthors = state.research.researchAuthors.filter(ra => ra.research_id === rr.id);
        
        return ({...rr, authors: researchauthors, sources: researchsources, targets: researchtargets });
    });

    return researchSources;
};

export const categoryLegendGrade = state => {
    const grade = [[1, 6], [2, 7], [3, 5], [4, 8]];

    if(state.research.getCategoriesStatus === "succeeded") {
        const legendGrade = grade.map(couple => {
            return [state.research.categories.find(cat => cat.id === couple[0]), state.research.categories.find(cat => cat.id === couple[1])]
        });

        return legendGrade;
    } else 
        return [];
};

export const { 
    updateClassName,
    updateTagsNames,
    removeSource,
    removeResearchAuthor,
    removeAuthor,
    removeClass,
    removeTag,
    setResearchSearchInput,
    updateCategories,
} = researchSlice.actions

export default researchSlice.reducer