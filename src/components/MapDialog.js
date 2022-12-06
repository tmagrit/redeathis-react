import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

const MapDialog = (props) => {
    const { children, onClose, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
        <Dialog onClose={handleClose} open={open} fullScreen>
          <AppBar position="sticky" color="inherit"  elevation={0}>
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
            </Toolbar>
          </AppBar>
          {children}
        </Dialog>
    );
};

export default MapDialog;
  
MapDialog.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};