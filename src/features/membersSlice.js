import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../services/supabaseClient';

export const getMembers = createAsyncThunk('members/getMembers', async (obj , { dispatch, getState }) => {
    try { 
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('updated_at', { ascending: false }) 

        if (error) 
            throw error

        return data

    } catch (error) {
        alert('getMembers()-error')
        console.log(error)
        alert(error.message)
    }
})

export const membersSlice = createSlice({
    name: 'members',
    initialState: {
        profiles: null,
        getMembersStatus: 'idle',
        getMembersError: null
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
        }
      }
})

export const selectSession = state => state.session

export const { 
    updateProfiles
} = membersSlice.actions

export default membersSlice.reducer