import * as React from 'react';
import Typography from '@mui/material/Typography';

const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {new Date().getFullYear()}{' | '}
          <a
              href='https://labhabitar.ufba.br'
              target='_blank'
              rel="noreferrer"
              aria-label='Lab Habitar'
              style={{ color: "inherit", textDecoration: "none" }}
          >
              Lab Habitar PPGAU/UFBA
          </a>
      </Typography>
    );
  }

export default Copyright;