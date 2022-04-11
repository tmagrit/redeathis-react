import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabaseClient';

export const trackSession = createAsyncThunk('session/trackSession', async (obj , { dispatch, getState }) => {
    try { 
        // LISTEN FOR CHANGES IN AUTH
        supabase.auth.onAuthStateChange((_event, session) => {
            dispatch(updateSession(session))
            dispatch(updateEvent(_event))
        })

    } catch (error) {
        return error
    }
})

export const getSession = createAsyncThunk('session/getSession', async () => {
    try { 
        const session = supabase.auth.session()

        return session

    } catch (error) {
        return error
    }
})

export const getProfile = createAsyncThunk('session/getProfile', async () => {
    try {
        const user = supabase.auth.user()
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
        if (error) 
            throw error

        return data
    } catch (error) {
        alert('getProfile()-error')
        alert(error)
        alert(error.message)
        return error
    } 
})

export const signIn = createAsyncThunk('session/signIn', async ({ email, password, navigate, trackLocation } , { dispatch, getState }) => {
    try { 
        const { session, error } = await supabase.auth.signIn({ 
            email: email,
            password: password,
        });

        if(error) {
            throw error
        } 
        alert('Sucesso')
        return { session: session, error: error }
    } catch (error) {
        alert('signIn()-error')
        alert(error)
        alert(error.message)
    } finally {
        navigate(trackLocation);
    }
})

export const invite = createAsyncThunk('session/invite', async ({ email } , { dispatch, getState }) => {
    try { 
        const { error } = await supabase.auth.signIn({ email })
        alert('Solicite ao convidado que acesse o link de cadastro no e-mail')

        if(error) {
            throw error
        } 

    } catch (error) {
        alert('invite()-error')
        alert(error)
        alert(error.message)
    } 
})

export const join = createAsyncThunk('session/join', async ({ name, surname, password, navigate, trackLocation } , { dispatch, getState }) => {
    try { 
        const { user, error } = await supabase.auth.update({ password: password });
        alert('Senha cadastrada com sucesso');

        if(error) {
            throw error
        } 

    } catch (error) {
        //return { error: error }
        alert('join()-catch-error')
        console.log('error-object', error)
        alert(error.message)
    } finally {
        const updatedProfile = {
            name: name,
            surname: surname,
        }
        dispatch(updateProfile(updatedProfile));
        navigate(trackLocation);
    }
})

export const updateProfile = createAsyncThunk('session/updateProfile', async (obj , { dispatch, getState }) => {
    try { 
        //const { profile } = getState()
        const user = supabase.auth.user()
        const updatedProfile = {
            ...obj,
            id: user.id,
          }
        console.log('updateProfile()',updatedProfile)
        const { data, error } = await supabase
            .from('profiles')
            .update(updatedProfile)
            .match({ id: user.id })
            .single()

        alert('Dados cadastrais atualizados com sucesso');
        if(error) {
            throw error
        }  

        return data
    } catch (error) {
        alert('updateProfile()-error')
        console.log('updateProfile()-error',error)
        alert(error.message)
    }
})

export const logout = createAsyncThunk('session/logout', async () => {
    try { 
        const { error } = await supabase.auth.signOut()
        if(error) 
            throw error
    
    return null

    } catch (error) {
        return error
    } 
})

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        session: null,
        event: null,
        profile: null,
        sessionStatus: 'idle',
        sessionError: null,
        trackStatus: 'idle',
        trackError: null,
        profileStatus: 'idle',
        profileError: null,
        logoutStatus: 'idle',
        logoutError: null,
        signInStatus: 'idle',
        signInError: null,
        inviteStatus: 'idle',
        inviteError: null,
        joinStatus: 'idle',
        joinError: null,
        updateProfileStatus: 'idle',
        updateProfileError: null
    },
    reducers: {
        updateSession(state, action) {
            state.session = action.payload
        },
        updateEvent(state, action) {
            state.event = action.payload
        }
    },
    extraReducers: {
        [trackSession.pending]: (state) => {
            state.trackStatus = 'loading'
          },
        [trackSession.fulfilled]: (state, action) => {
            //state.authListener = action.payload
            state.trackStatus = 'succeeded'
        },
        [trackSession.rejected]: (state, action) => {
            state.trackStatus = 'failed'
            state.trackError = action.error.message
        },
        [getSession.pending]: (state) => {
            state.sessionStatus = 'loading'
        },
        [getSession.fulfilled]: (state, action) => {
            state.session = action.payload
            state.sessionStatus = 'succeeded'
        },
        [getProfile.rejected]: (state, action) => {
          state.profileStatus = 'failed'
          state.profileError = action.error.message
        },
        [getProfile.pending]: (state) => {
            state.profileStatus = 'loading'
        },
        [getProfile.fulfilled]: (state, action) => {
            state.profile = action.payload
            state.profileStatus = 'succeeded'
        },
        [getSession.rejected]: (state, action) => {
          state.sessionStatus = 'failed'
          state.sessionError = action.error.message
        },
        [logout.pending]: (state) => {
            state.logoutStatus = 'loading'
          },
        [logout.fulfilled]: (state, action) => {
            state.session = action.payload
            state.logoutStatus = 'succeeded'
        },
        [logout.rejected]: (state, action) => {
            state.logoutStatus = 'failed'
            state.logoutError = action.error.message
        },
        [signIn.pending]: (state) => {
            state.signInStatus = 'loading'
          },
        [signIn.fulfilled]: (state, action) => {
            state.session = action.payload.session
            state.signInError = action.payload.error
            state.signInStatus = 'succeeded'
        },
        [signIn.rejected]: (state, action) => {
            state.session = action.payload.session
            state.signInStatus = 'failed'
            state.signInError = action.error.message
        },
        [invite.pending]: (state) => {
            state.inviteStatus = 'loading'
          },
        [invite.fulfilled]: (state, action) => {
            //state.session = action.payload.session
            state.inviteError = action.payload.error
            state.inviteStatus = 'succeeded'
        },
        [invite.rejected]: (state, action) => {
            //state.session = action.payload.session
            state.inviteStatus = 'failed'
            state.inviteError = action.error.message
        },
        [join.pending]: (state) => {
            state.joinStatus = 'loading'
          },
        [join.fulfilled]: (state, action) => {
            //state.profile = action.payload
            state.joinError = action.payload.error
            state.joinStatus = 'succeeded'
        },
        [join.rejected]: (state, action) => {
            //state.profile = action.payload
            state.joinStatus = 'failed'
            state.joinError = action.error.message
        },
        [updateProfile.pending]: (state) => {
            state.joinStatus = 'loading'
          },
        [updateProfile.fulfilled]: (state, action) => {
            state.profile = action.payload
            state.updateProfileError = action.payload.error
            state.updateProfileStatus = 'succeeded'
        },
        [updateProfile.rejected]: (state, action) => {
            //state.profile = action.payload
            state.updateProfileStatus = 'failed'
            state.updateProfileError = action.error.message
        }
      }
})

export const selectSession = state => state.session

export const { 
    updateSession,
    updateEvent
} = sessionSlice.actions

export default sessionSlice.reducer