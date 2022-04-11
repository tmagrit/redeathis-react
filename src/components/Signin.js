import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../features/session/sessionSlice';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Signin = () => {

  // REDUX STATES
  const dispatch = useDispatch();

  // REACT ROUTER 
  const navigate = useNavigate();
  const location = useLocation();
  const trackLocation = location.state?.from?.pathname || '/admin';
  console.log('trackLocation', trackLocation)

  // STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // VALIDATE FIELDS
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validatePassword = (str) => {
    if(str.length < 6)
      return true;
    else
      return false;
  };
  const emailError = (str) => {
    if(!validateEmail(str) && str.length > 0)
      return true;
    else
      return false;
  };

   // DISPATCH SIGN IN DATA
   const handleSignin = (email, password, navigate, trackLocation) => {
    dispatch(signIn({ email, password, navigate, trackLocation }));
  };
 
  return (
    <React.Fragment>
      <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        //backgroundColor: 'primary.light',
      }}
    >  
      <Typography component="p" variant="h4" pb={10}>
        __MARCA
      </Typography>
      <Paper elevation={3} sx={{ maxWidth: 500, }} >
        <Box sx={{ p: 4, }} >
        <Typography component="p" variant="h5" align="center" mb={4} >
          Acesso Rede Residência ATHIS
        </Typography>
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
          sx={{ my: 1,}}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
          }}
        />
        <TextField
          value={password}
          error={validatePassword(password)}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          label="Senha"
          id="input-password"
          size="small"
          type="password"
          helperText={password.length < 6 ? "Mínimo 6 caracteres, sem espaços em branco" : null}
          sx={{ my: 1,}}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
          }}
        />
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ my: 2,}} 
          onClick={e => {
            e.preventDefault();
            handleSignin(email, password, navigate, trackLocation);
          }}  
        >
          Acessar
        </Button>
        </Box>
      <Divider />
      <Box sx={{ px: 4, py: 3, }} >
      <Typography component="p" variant="p" align="center" >
          Esqueceu sua senha? <Link to="/resetpassword" color="inherit" underline="hover" >Clique aqui</Link>
        </Typography>
      </Box>
      </Paper>
      <Typography component="p" variant="h4" pt={15}>
        __RODAPÉ
      </Typography>
    </Box>
    </React.Fragment>
  );
}

export default Signin