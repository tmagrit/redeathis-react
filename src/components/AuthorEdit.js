import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
//import { DateTime } from 'luxon';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

import AuthorModify from './AuthorModify';

const AuthorEdit = (props) => {

    const { onClose, open, row } = props;

    const handleClose = () => {
      onClose();
    };

    return (
        <Dialog 
            onClose={handleClose} 
            open={open} 
            fullWidth={true}
            maxWidth='lg'
        >
            <AppBar position="static" color="inherit">
                <Toolbar  variant="dense" >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />

                    
                   
                </Toolbar>
            </AppBar>

            <DialogTitle >
                Editar Autor
            </DialogTitle>
            <DialogContent dividers sx={{ minHeight: 200, }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>   
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            <AuthorModify row={row} />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default AuthorEdit;
  
AuthorEdit.propTypes = {
    row: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};