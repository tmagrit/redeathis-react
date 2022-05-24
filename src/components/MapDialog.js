import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

const MapDialog = (props) => {
    const { children, onClose, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
        // <Dialog onClose={handleClose} open={open}>
        <Dialog onClose={handleClose} open={open} fullScreen>
          <AppBar position="sticky" color="inherit">
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                
              >
                <CloseIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1, }} >

              </Box>
              <TextField
                //value={email}
                //error={emailError(email)}
                //onChange={e => setEmail(e.target.value)}
                //fullWidth
                //label="Localidade"
                placeholder="Localidade"
                id="input-search"
                size="small"
                type="text"
                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                //sx={{ my: 1,}}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LocationSearchingIcon /></InputAdornment>,
                }}
              />
            </Toolbar>
          </AppBar>
          {children}
        </Dialog>
        );
    }

  export default MapDialog;
  
  MapDialog.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };