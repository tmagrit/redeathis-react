import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { invite } from '../features/sessionSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


const Invite = () => {

    // REDUX STATES
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')

        
    const handleSignin = (email) => {
        dispatch(invite({ email }));
        setEmail('');
    }

    // VALIDATE FIELDS
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const emailError = (str) => {
        if(!validateEmail(str) && str.length > 0)
        return true
        else
        return false
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    minWidth: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 3,
                }}
            >
                <TextField
                    value={email}
                    error={emailError(email)}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    label="Endereço de e-mail"
                    id="input-email"
                    size="small"
                    type="email"
                    helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                    sx={{ mb: 2,}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><AlternateEmailIcon /></InputAdornment>,
                    }}
                />
                <Button 
                    variant="contained" 
                    disabled={!validateEmail(email) || email.length === 0}
                    fullWidth 
                    onClick={e => {
                        e.preventDefault();
                        handleSignin(email);
                    }}
                >
                    Enviar Convite
                </Button>
            </Box>
        </React.Fragment>
    );
}

export default Invite