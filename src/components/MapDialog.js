import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
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
              <Box sx={{ flexGrow: 1, }} />
              <TextField
                placeholder="Localidade"
                id="input-search"
                size="small"
                type="text"
                sx={{ my: 1,}}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><TravelExploreIcon /></InputAdornment>,
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