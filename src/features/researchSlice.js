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
            .select('*')
            .order('updated_at', { ascending: false });

        if (error) 
            throw error;

        return data;

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

export const createResearch = createAsyncThunk('research/createResearch', async (obj , { dispatch, getState }) => {
    try { 
        const { research } = getState()
        const category = research.categories.find(c => c.id === obj.category_id)
        const { data, error } = await supabase
            .from('research')
            .insert([obj])

        alert('Pesquisa criada com sucesso.');
        if(error) {
            throw error
        }  

        return { ...data[0], category: category };
    } catch (error) {
        alert('updateResearch()-error')
        console.log(error)
        alert(error.message)
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


export const researchSlice = createSlice({
    name: 'research',
    initialState: {
        research: [],
        getResearchStatus: 'idle',
        getResearchError: null,

        updateResearchStatus: 'idle',
        updateResearchError: null,

        createResearchStatus: 'idle',
        createResearchError: null,

        categories: [],
        getCategoriesStatus: 'idle',
        getCategoriesError: null,

        statuses: [],
        getStatusesStatus: 'idle',
        getStatusesError: null,

        authors: [],
        getAuthorsStatus: 'idle',
        getAuthorsError: null,

        researchAuthors: [],
        getResearchAuthorsStatus: 'idle',
        getResearchAuthorsError: null,

        sources: [],
        getSourcesStatus: 'idle',
        getSourcesError: null,

        addSourceStatus: 'idle',
        addSourceError: null,

        deleteSourceStatus: 'idle',
        deleteSourceError: null,

        deleteResearchAuthorStatus: 'idle',
        deleteResearchAuthorError: null,
    },
    reducers: {
        removeSource(state, action) { 
            const newSources = state.sources.filter(s => s.id !== action.payload.id);
            state.sources = newSources;
        },
        removeAuthor(state, action) { 
            const newResearchAuthors = state.researchAuthors.filter(ra => ra.id !== action.payload.id);
            state.researchAuthors = newResearchAuthors;
        }
        
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

      }
})

// // SELECTOR OF COMPLETE PROFILE
// export const selectFullProfiles  = state => {
//     if (    state.research.getMembersStatus === 'succeeded' && 
//             state.research.getRolesStatus === 'succeeded' &&
//             state.research.getProfileRolesStatus === 'succeeded' && 
//             state.research.getOrganizationsStatus === 'succeeded' ) {
        
//         const fullProfiles = state.research.profiles.map(p => {
//             return ({
//                         ...p, 
//                         organization: state.research.organizations.find(o => o.id === p.profile_roles[0].organization_id),
//                         role: state.research.roles.find(r => r.id === p.profile_roles[0].role),
//                     });
//         });

//         return fullProfiles
//     }

//     return null
// }

export const { 
    removeSource,
    removeAuthor,
} = researchSlice.actions

export default researchSlice.reducer