
import * as React from 'react';
import Box from '@mui/material/Box';

export function categoryTitle(categoryname) {

  if(categoryname === 'Projetos') 
    return (
            <React.Fragment>
              <Box sx={{ fontWeight: 'bold', display: 'inline', }}>Projetos </Box> 
              <Box sx={{ display: 'inline', }}>e Práticas</Box>
            </React.Fragment>
          ); 
  if (categoryname === 'Práticas')
    return (
            <React.Fragment>
              <Box sx={{ display: 'inline', }}>Projetos e </Box>
              <Box sx={{ fontWeight: 'bold', display: 'inline', }}>Práticas</Box> 
            </React.Fragment>
          );
  if(categoryname === 'Instituições') 
    return (
            <React.Fragment>
              <Box sx={{ fontWeight: 'bold', display: 'inline', }}>Instituições </Box> 
              <Box sx={{ display: 'inline', }}>e Coletivos</Box>
            </React.Fragment>
          ); 
  if (categoryname === 'Coletivos')
      return (
            <React.Fragment>
              <Box sx={{ display: 'inline', }}>Instituições e </Box>
              <Box sx={{ fontWeight: 'bold', display: 'inline', }}>Coletivos</Box> 
            </React.Fragment>
          );
  if(categoryname === 'Publicações') 
  return (
          <React.Fragment>
            <Box sx={{ fontWeight: 'bold', display: 'inline', }}>Publicações </Box> 
            <Box sx={{ display: 'inline', }}>e Eventos</Box>
          </React.Fragment>
        ); 
  if (categoryname === 'Eventos')
  return (
          <React.Fragment>
            <Box sx={{ display: 'inline', }}>Publicações e </Box>
            <Box sx={{ fontWeight: 'bold', display: 'inline', }}>Eventos</Box> 
          </React.Fragment>
        );
  if(categoryname === 'Legislação') 
  return (
          <React.Fragment>
            <Box sx={{ fontWeight: 'bold', display: 'inline', }}>Legislação </Box> 
            <Box sx={{ display: 'inline', }}>e Suporte</Box>
          </React.Fragment>
        ); 
  if (categoryname === 'Suporte')
    return (
          <React.Fragment>
            <Box sx={{ display: 'inline', }}>Legislação e </Box>
            <Box sx={{ fontWeight: 'bold', display: 'inline', }}>Fomento</Box> 
          </React.Fragment>
        );

          else
    return null;

};
