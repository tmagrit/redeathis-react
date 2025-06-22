import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { closeImagesSnackbar } from '../features/imagesSlice';

const ImagesSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.images.snackbar
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(closeImagesSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ImagesSnackbar;