import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';

const MapDialog = (props) => {
    const { children, onClose, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
        // <Dialog onClose={handleClose} open={open}>
        <Dialog onClose={handleClose} open={open} fullScreen>
          <AppBar position="sticky" color="inherit">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
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