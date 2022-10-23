import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useHistory } from './history';

const Title = (props) => {

  // MY HISTORY HOOK
  const history = useHistory();
  const section = history?.pathArray[2] || ''
  const context = history?.pathArray[3] || ''
  
  // TRACK ROUTES 
  useEffect(() => {
  }, [history.location]);

  function titleGenerator(section, context) {
    // MAIN 
    if(section === '') {
      // 
      if(context === '') {
        if(props.position === 'left')  
          return 'Resumo Geral'; 
        if(props.position === 'right')  
          return 'Minhas Colaborações?';
        else  
          return 'Atualizações Recentes';
      }
    }

    // RESEARCH 
    if(section === 'research') {

      // RESEARCH / MAIN
      if(context === '') 
        return 'Índice de Referências';  

      // RESEARCH / CREATE  
      if(context === 'create') {
        if(props.position === 'left')  
          return 'Nova Referência'; 
        if(props.position === 'right')  
          return 'Status';
        if(props.position === 'rightmiddle')  
          return 'Geolocalização';  
        else   
        if(props.position === 'rightbelow')  
          return 'Ano';  
        else  
          return 'Referências Relacionadas';
      }

      // RESEARCH / EDIT 
      if(context === 'edit') {
        if(props.position === 'left')  
          return 'Editar Referência'; 
        if(props.position === 'right')  
          return 'Status';
        if(props.position === 'rightmiddle')  
          return 'Geolocalização';  
        else   
        if(props.position === 'rightbelow')  
          return 'Ano';  
        else  
          return 'Referências Relacionadas';  
      } 

      // RESEARCH / AUTHORS 
      if(context === 'authors') {
        return 'Índice de Autores';
      } 
    };
      
    // AUTHORS 
    if(section === 'authors') {
      return 'Índice de Autores';
    };

    // MEMBERS 
    if(section === 'members') {

      // MEMBERS / ALL
      if(context === '') 
        return 'Índice de Colaboradores';     

      // MEMBERS / EDIT 
      if(context === 'edit') {
        if(props.position === 'left')  
          return 'Editar Colaborador'; 
        if(props.position === 'right')  
          return 'Atualizar';
        else  
          return 'Produção Relacionada';  
      } 
    }

    // PAGES
    if(section === 'pages') {

      // PAGES / MAIN
      if(context === '') 
        return 'Índice de Seções';    

      // PAGES / CREATE  
      if(context === 'create') {
        if(props.position === 'left')  
          return 'Nova Seção'; 
        if(props.position === 'right')  
          return 'Status';
      }               

      // PAGES / EDIT 
      if(context === 'edit') {
        if(props.position === 'left')  
          return 'Editar Seção'; 
        if(props.position === 'right')  
          return 'Status';
        else  
          return 'Definir';  
      } 
    }  

  };

  return (
      <Typography component="div" variant="body1" color="inherit" gutterBottom sx={{ fontWeight: 600, }}>
        {titleGenerator(section, context)}
      </Typography>
  );
};

Title.propTypes = {
  position: PropTypes.string,
};

export default Title;
