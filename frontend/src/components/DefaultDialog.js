import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const DefaultDialog = (props) => {
    const { children, onClose, title, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog>
        );
    }

  export default DefaultDialog
  
  DefaultDialog.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };