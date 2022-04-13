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
        alert('trackSession()-error')
        console.log(error)
        alert(error.message)
    }
})

export const getSession = createAsyncThunk('session/getSession', async (obj , { dispatch, getState }) => {
    try { 
        const session = supabase.auth.session()
        if(session)
            dispatch(getProfile(session?.user))

        return session

    } catch (error) {
        alert('getSession()-error')
        console.log(error)
        alert(error.message)
    }
})

export const getProfile = createAsyncThunk('session/getProfile', async ( user , { dispatch, getState }) => {
    try {
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
        console.log(error)
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

        console.log('session?.user', session?.user)
        if(session?.user)
            dispatch(getProfile(session?.user))
        
        alert('Sucesso')
        return session

    } catch (error) {
        alert('signIn()-error')
        console.log(error)
        alert(error.message)
    } finally {
        navigate(trackLocation);
    }
})

export const invite = createAsyncThunk('session/invite', async ({ email } , { dispatch, getState }) => {
    try { 
        const { error } = await supabase.auth.signIn({ email })
        alert(`Solicite ao convidado que acesse o link enviado para ${email} para completar o cadastro.`)

        if(error) {
            throw error
        } 

    } catch (error) {
        alert('invite()-error')
        console.log(error)
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
        alert('join()-error')
        console.log(error)
        alert(error.message)
    } finally {
        const updatedProfile = {
            name: name,
            surname: surname,
            active: true,
        }
        dispatch(updateProfile(updatedProfile));
        navigate(trackLocation);
    }
})

export const updateProfile = createAsyncThunk('session/updateProfile', async (obj , { dispatch, getState }) => {
    try { 
        const user = supabase.auth.user()
        const updatedProfile = {
            ...obj,
          }
        const { data, error } = await supabase
            .from('profiles')
            .update(updatedProfile)
            .match({ id: user.id })
            .single()

        alert('Dados do colaborador atualizados com sucesso.');
        if(error) {
            throw error
        }  

        return data
    } catch (error) {
        alert('updateProfile()-error')
        console.log(error)
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
        event: null,
        trackSessionStatus: 'idle',
        trackSessionError: null,

        session: null,
        sessionStatus: 'idle',
        sessionError: null,

        profile: null,
        getProfileStatus: 'idle',
        getProfileError: null,

        signInStatus: 'idle',
        signInError: null,

        inviteStatus: 'idle',
        inviteError: null,

        joinStatus: 'idle',
        joinError: null,

        updateProfileStatus: 'idle',
        updateProfileError: null,

        logoutStatus: 'idle',
        logoutError: null
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
            state.trackSessionStatus = 'loading'
          },
        [trackSession.fulfilled]: (state, action) => {
            state.trackSessionStatus = 'succeeded'
        },
        [trackSession.rejected]: (state, action) => {
            state.trackSessionStatus = 'failed'
            state.trackSessionError = action.error
        },
        [getSession.pending]: (state) => {
            state.sessionStatus = 'loading'
        },
        [getSession.fulfilled]: (state, action) => {
            state.session = action.payload
            state.sessionStatus = 'succeeded'
        },
        [getSession.rejected]: (state, action) => {
            state.sessionStatus = 'failed'
            state.sessionError = action.error
        },
        [getProfile.pending]: (state) => {
            state.getProfileStatus = 'loading'
        },
        [getProfile.fulfilled]: (state, action) => {
            state.profile = action.payload
            state.getProfileStatus = 'succeeded'
        },
        [getProfile.rejected]: (state, action) => {
            state.getProfileStatus = 'failed'
            state.getProfileError = action.error
        },
        [signIn.pending]: (state) => {
            state.signInStatus = 'loading'
          },
        [signIn.fulfilled]: (state, action) => {
            state.session = action.payload
            state.signInStatus = 'succeeded'
        },
        [signIn.rejected]: (state, action) => {
            state.session = action.payload
            state.signInStatus = 'failed'
            state.signInError = action.error
        },
        [invite.pending]: (state) => {
            state.inviteStatus = 'loading'
          },
        [invite.fulfilled]: (state, action) => {
            state.inviteStatus = 'succeeded'
        },
        [invite.rejected]: (state, action) => {
            state.inviteStatus = 'failed'
            state.inviteError = action.error
        },
        [join.pending]: (state) => {
            state.joinStatus = 'loading'
          },
        [join.fulfilled]: (state, action) => {
            state.joinStatus = 'succeeded'
        },
        [join.rejected]: (state, action) => {
            state.joinStatus = 'failed'
            state.joinError = action.error
        },
        [updateProfile.pending]: (state) => {
            state.updateProfileStatus = 'loading'
          },
        [updateProfile.fulfilled]: (state, action) => {
            state.profile = action.payload
            state.updateProfileStatus = 'succeeded'
        },
        [updateProfile.rejected]: (state, action) => {
            state.updateProfileStatus = 'failed'
            state.updateProfileError = action.error
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
            state.logoutError = action.error
        }
      }
})

export const selectSession = state => state.session

export const { 
    updateSession,
    updateEvent
} = sessionSlice.actions

export default sessionSlice.reducer