import * as React from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { join, logout } from '../features/sessionSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Signup = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [nameFocus, setNameFocus] = useState(false)
  const [surnameFocus, setSurnameFocus] = useState(false)

  // REACT ROUTER 
  const navigate = useNavigate();
  const location = useLocation();
  const trackLocation = location.state?.from?.pathname || '/admin';
  console.log('trackLocation', trackLocation)

  // COMPARE PASSWORDS
  const confirmPassword = (pass) => {
    if(pass === password && pass.length > 5)
      return null
    else
      return true
  }

  // VALIDATE FIELDS
  const validateNames = (str) => {
    if(str.replace(/\s+/g,"").length < 2)
      return true
    else
      return false
  }

  // DISPATCH SIGN UP DATA
  const handleSignup = (name, surname, password, navigate, trackLocation) => {
    dispatch(join({ name, surname, password, navigate, trackLocation }))
  }

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
      <Typography component="span" variant="h4" pb={10}>
        __MARCA
      </Typography>
      <Paper elevation={3} sx={{ maxWidth: 500, }} >
        <Box sx={{ p: 4, }} >
        <Typography component="span" variant="h5" align="center" mb={4} >
          Inscrição Rede Residência ATHIS
        </Typography>
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          required
          error={validateNames(name)}
          fullWidth
          label="Primeiro Nome"
          id="input-first-name"
          size="small"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          helperText={nameFocus ? 'ex: Fulano' : null}
          InputLabelProps={{ shrink: true }}
          sx={{ my: 1,}}
        />
        <TextField
          value={surname}
          onChange={e => setSurname(e.target.value)}
          required
          error={validateNames(surname)}
          fullWidth
          label="Sobrenome"
          id="input-surname"
          size="small"
          onFocus={() => setSurnameFocus(true)}
          onBlur={() => setSurnameFocus(false)}
          helperText={surnameFocus ? 'ex: de Tal e Souza' : null}
          InputLabelProps={{ shrink: true }}
          sx={{ my: 1,}}
        />
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          fullWidth
          label="Senha"
          id="input-password"
          size="small"
          type="password"
          InputLabelProps={{ shrink: true }}
          sx={{ mt: 3,}}
        />
        <TextField
          value={confirmedPassword}
          error={confirmPassword(confirmedPassword)}
          onChange={e => setConfirmedPassword(e.target.value)}
          required
          fullWidth
          label="Confirme senha"
          id="input-confirm-password"
          size="small"
          helperText={confirmPassword(confirmedPassword) ? 'Ao menos 6 caracteres, sem espaços em branco' : null}
          //size="small"
          type="password"
          InputLabelProps={{ shrink: true }}
          sx={{ mt: 2,}}
        />
        <Button 
          variant="contained" 
          fullWidth 
          size="large" 
          sx={{ my: 2,}} 
          disabled={confirmPassword(confirmedPassword)}
          onClick={e => {
            e.preventDefault();
            handleSignup(name, surname, password, navigate, trackLocation);
          }}
        >
          Inscrever-se
        </Button>
        <Button 
          variant="contained" 
          fullWidth 
          size="large" 
          sx={{ my: 2,}} 
          //disabled={confirmPassword(confirmedPassword)}
          onClick={e => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          Sair
        </Button>
        </Box>
      <Divider />
      <Box sx={{ px: 4, py: 3, }} >
      <Typography component="span" variant="p" align="center" >
          Já é membro? <Link to="/signin" color="inherit" underline="hover" >Acesse aqui</Link>
        </Typography>
      </Box>
      </Paper>
      <Typography component="span" variant="h4" pt={15}>
        __RODAPÉ
      </Typography>
    </Box>
    </React.Fragment>
  );
}

export default Signup