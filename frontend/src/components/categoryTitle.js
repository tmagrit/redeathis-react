
import * as React from 'react';
import Box from '@mui/material/Box';

export function categoryTitle(categoryname) {

  if(categoryname === 'Produtos') 
    return (
            <React.Fragment>
              <Box sx={{ fontWeight: 'bold', display: 'inline', }}>AÇÕES </Box> 
              <Box sx={{ display: 'inline', }}>(Produtos)</Box>
            </React.Fragment>
          ); 
  if (categoryname === 'Práticas')
    return (
            <React.Fragment>
              <Box sx={{ fontWeight: 'bold', display: 'inline', }}>AÇÕES </Box>
              <Box sx={{ display: 'inline', }}>(Práticas)</Box> 
            </React.Fragment>
          );
  if(categoryname === 'Instituições') 
    return (
            <React.Fragment>
              <Box sx={{ fontWeight: 'bold', display: 'inline', }}>AGENTES </Box> 
              <Box sx={{ display: 'inline', }}>(Instituições)</Box>
            </React.Fragment>
          ); 
  if (categoryname === 'Coletivos')
      return (
            <React.Fragment>
              <Box sx={{ fontWeight: 'bold', display: 'inline', }}>AGENTES </Box>
              <Box sx={{ display: 'inline', }}>(Coletivos)</Box> 
            </React.Fragment>
          );
  if(categoryname === 'Publicações') 
  return (
          <React.Fragment>
            <Box sx={{ fontWeight: 'bold', display: 'inline', }}>DIVULGAÇÃO </Box> 
            <Box sx={{ display: 'inline', }}>(Publicações)</Box>
          </React.Fragment>
        ); 
  if (categoryname === 'Eventos')
  return (
          <React.Fragment>
            <Box sx={{ fontWeight: 'bold', display: 'inline', }}>DIVULGAÇÃO </Box>
            <Box sx={{ display: 'inline', }}>(Eventos)</Box> 
          </React.Fragment>
        );
  if(categoryname === 'Legislação') 
  return (
          <React.Fragment>
            <Box sx={{ fontWeight: 'bold', display: 'inline', }}>SUPORTE </Box> 
            <Box sx={{ display: 'inline', }}>(Legislação)</Box>
          </React.Fragment>
        ); 
  if (categoryname === 'Fomento')
    return (
          <React.Fragment>
            <Box sx={{ fontWeight: 'bold', display: 'inline', }}>SUPORTE </Box>
            <Box sx={{ display: 'inline', }}>(Fomento)</Box> 
          </React.Fragment>
        );

          else
    return null;

};
