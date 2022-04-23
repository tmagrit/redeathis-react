import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabaseClient';

export const getResearch = createAsyncThunk('research/getResearch', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('research')
            .select('*')
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

// export const getRoles = createAsyncThunk('research/getRoles', async (obj , { dispatch, getState }) => {
//     try { 
//         const { data, error } = await supabase
//             .from('roles')
//             .select('*')
//             .order('updated_at', { ascending: false }); 

//         if (error) 
//             throw error;

//         return data;

//     } catch (error) {
//         alert('getRoles()-error');
//         console.log(error);
//         alert(error.message);
//     };
// });

// export const getOrganizations = createAsyncThunk('research/getOrganizations', async (obj , { dispatch, getState }) => {
//     try { 
//         const { data, error } = await supabase
//             .from('organizations')
//             .select('*')
//             .order('updated_at', { ascending: false });

//         if (error) 
//             throw error;

//         return data;

//     } catch (error) {
//         alert('getOrganizations()-error')
//         console.log(error)
//         alert(error.message)
//     };
// });

export const researchSlice = createSlice({
    name: 'research',
    initialState: {
        research: [],
        getResearchStatus: 'idle',
        getResearchError: null,

        categories: [],
        getCategoriesStatus: 'idle',
        getCategoriesError: null,

        statuses: [],
        getStatusesStatus: 'idle',
        getStatusesError: null,

        // organizations: [],
        // getOrganizationsStatus: 'idle',
        // getOrganizationsError: null,
    },
    reducers: {
        // updateProfiles(state, action) {
        //     state.profiles = action.payload
        // },
        // toggleProfileActive: {
        //     reducer(state, action) {
        //         const newstate = state.profiles.map(p => {
        //             if(p.ind !== action.payload.ind) 
        //                 return p
        //             else {
        //                 const updatedProfile = {
        //                     ...p,
        //                     active: !action.payload.active,
        //                 }
        //                 console.log('action.payload', action.payload)
        //                 console.log('updatedProfile', updatedProfile)
        //                 return updatedProfile   
        //             } 
        //         }) 
        //         return {
        //             ...state,
        //             profiles: newstate,
        //         }  
        //     },
        //     prepare({ ind, active }) {
        //         return {
        //             payload: {
        //                 ind,
        //                 active
        //             }
        //         }
        //     }
        // },
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
            state.CategoriesStatus = 'succeeded'
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

        // [getOrganizations.pending]: (state) => {
        //     state.getOrganizationsStatus = 'loading'
        // },
        // [getOrganizations.fulfilled]: (state, action) => {
        //     state.organizations = action.payload
        //     state.getOrganizationsStatus = 'succeeded'
        // },
        // [getOrganizations.rejected]: (state, action) => {
        //   state.getOrganizationsStatus = 'failed'
        //   state.getOrganizationsError = action.error
        // }
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
    // updateProfiles,
    // toggleProfileActive,
} = researchSlice.actions

export default researchSlice.reducer