import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabaseClient';

export const getProfiles = createAsyncThunk('members/getProfiles', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('updated_at', { ascending: false }) 

        if (error) 
            throw error

        return data

    } catch (error) {
        return error
    }
})

export const membersSlice = createSlice({
    name: 'session',
    initialState: {
        profiles: null,
        getProfilesStatus: 'idle',
        getProfilesError: null
    },
    reducers: {
        updateProfiles(state, action) {
            state.session = action.payload
        }
    },
    extraReducers: {
        [getProfiles.pending]: (state) => {
            state.sessionStatus = 'loading'
        },
        [getProfiles.fulfilled]: (state, action) => {
            state.session = action.payload
            state.sessionStatus = 'succeeded'
        },
        [getProfiles.rejected]: (state, action) => {
          state.sessionStatus = 'failed'
          state.sessionError = action.error.message
        }
      }
})

export const selectSession = state => state.session

export const { 
    updateProfiles
} = membersSlice.actions

export default membersSlice.reducer