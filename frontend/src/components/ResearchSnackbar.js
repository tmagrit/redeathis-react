import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { closeResearchSnackbar } from '../features/researchSlice';

const ResearchSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.research.snackbar
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(closeResearchSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
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

export default ResearchSnackbar;