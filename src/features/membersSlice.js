import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabaseClient';

export const getMembers = createAsyncThunk('members/getMembers', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('profiles')
            .select(`
                *,
                profile_roles ( 
                    *,
                    user_id
                )
            `)
            .order('updated_at', { ascending: false });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getMembers()-error')
        console.log(error)
        alert(error.message)
    };
});

export const getProfileRoles = createAsyncThunk('members/getProfileRoles', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('profile_roles')
            .select('*')
            .order('updated_at', { ascending: false }); 

        if (error) 
            throw error;

            console.log('getProfileRoles()-data', data)
        return data;

    } catch (error) {
        alert('getProfileRoles()-error');
        console.log(error);
        alert(error.message);
    };
});

export const getRoles = createAsyncThunk('members/getRoles', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('roles')
            .select('*')
            .order('updated_at', { ascending: false }); 

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getRoles()-error');
        console.log(error);
        alert(error.message);
    };
});

export const getOrganizations = createAsyncThunk('members/getOrganizations', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('organizations')
            .select('*')
            .order('updated_at', { ascending: false });

        if (error) 
            throw error;

        return data;

    } catch (error) {
        alert('getOrganizations()-error')
        console.log(error)
        alert(error.message)
    };
});

export const membersSlice = createSlice({
    name: 'members',
    initialState: {
        profiles: [],
        getMembersStatus: 'idle',
        getMembersError: null,

        profileRoles: [],
        getProfileRolesStatus: 'idle',
        getProfileRolesError: null,

        roles: [],
        getRolesStatus: 'idle',
        getRolesError: null,

        organizations: [],
        getOrganizationsStatus: 'idle',
        getOrganizationsError: null,
    },
    reducers: {
        updateProfiles(state, action) {
            state.profiles = action.payload
        }
    },
    extraReducers: {
        [getMembers.pending]: (state) => {
            state.getMembersStatus = 'loading'
        },
        [getMembers.fulfilled]: (state, action) => {
            state.profiles = action.payload
            state.getMembersStatus = 'succeeded'
        },
        [getMembers.rejected]: (state, action) => {
          state.getMembersStatus = 'failed'
          state.getMembersError = action.error
        },

        [getProfileRoles.pending]: (state) => {
            state.getProfileRolesStatus = 'loading'
        },
        [getProfileRoles.fulfilled]: (state, action) => {
            state.profileRoles = action.payload
            state.getProfileRolesStatus = 'succeeded'
        },
        [getProfileRoles.rejected]: (state, action) => {
          state.getProfileRolesStatus = 'failed'
          state.getProfileRolesError = action.error
        },

        [getRoles.pending]: (state) => {
            state.getRolesStatus = 'loading'
        },
        [getRoles.fulfilled]: (state, action) => {
            state.roles = action.payload
            state.getRolesStatus = 'succeeded'
        },
        [getRoles.rejected]: (state, action) => {
          state.getRolesStatus = 'failed'
          state.getRolesError = action.error
        },

        [getOrganizations.pending]: (state) => {
            state.getOrganizationsStatus = 'loading'
        },
        [getOrganizations.fulfilled]: (state, action) => {
            state.organizations = action.payload
            state.getOrganizationsStatus = 'succeeded'
        },
        [getOrganizations.rejected]: (state, action) => {
          state.getOrganizationsStatus = 'failed'
          state.getOrganizationsError = action.error
        }
      }
})

// SELECTOR OF COMPLETE PROFILE
export const selectFullProfiles  = state => {
    if (    state.members.getMembersStatus === 'succeeded' && 
            state.members.getRolesStatus === 'succeeded' &&
            state.members.getProfileRolesStatus === 'succeeded' && 
            state.members.getOrganizationsStatus === 'succeeded' ) {
        
        const fullProfiles = state.members.profiles.map(p => {
            return ({
                        ...p, 
                        organization: state.members.organizations.find(o => o.id === p.profile_roles[0].organization_id),
                        role: state.members.roles.find(r => r.id === p.profile_roles[0].role),
                    });
        });

        return fullProfiles
    }

    return null
}

export const { 
    updateProfiles,
} = membersSlice.actions

export default membersSlice.reducer