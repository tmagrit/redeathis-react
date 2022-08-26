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
      if(context === '') {
        if(props.position === 'left')  
          return 'Resumo de Pesquisas'; 
        if(props.position === 'right')  
          return 'Minhas Pesquisas';
        else  
          return 'Índice de Pesquisas';
      }
      // RESEARCH / ALL
      if(context === 'all') 
        return 'Índice de Pesquisas';  
      // RESEARCH / CREATE  
      if(context === 'create') {
        if(props.position === 'left')  
          return 'Nova Pesquisa'; 
        if(props.position === 'right')  
          return 'Publicar';
        if(props.position === 'rightmiddle')  
          return 'Geolocalização';  
        else   
        if(props.position === 'rightbelow')  
          return 'Cronologia';  
        else  
          return 'Itens Relacionados';
      }      
      // RESEARCH / EDIT 
      if(context === 'edit') {
        if(props.position === 'left')  
          return 'Editar Pesquisa'; 
        if(props.position === 'right')  
          return 'Publicar';
        if(props.position === 'rightmiddle')  
          return 'Geolocalização';  
        else   
        if(props.position === 'rightbelow')  
          return 'Cronologia';  
        else  
          return 'Itens Relacionados';  
      } 
    }
      
    // CATEGORIES 
    if(section === 'categories') {
      // CATEGORIES / MAIN
      if(context === '') {
        if(props.position === 'left')  
          return 'Resumo de Categorias'; 
        if(props.position === 'right')  
          return '???';
        else  
          return 'Índice de Categorias';
      }
      // CATEGORIES / ALL
      if(context === 'all') 
        return 'Índice de Categorias';  
      // CATEGORIES / CREATE  
      if(context === 'create') {
        if(props.position === 'left')  
          return 'Nova Categoria'; 
        if(props.position === 'right')  
          return 'Publicar';
        else  
          return 'Itens Relacionados';
      }      
      // RESEARCH / EDIT 
      if(context === 'edit') {
        if(props.position === 'left')  
          return 'Editar Categoria'; 
        if(props.position === 'right')  
          return 'Publicar';
        else  
          return 'Itens Relacionados';  
      } 
    }

    // MEMBERS 
    if(section === 'members') {
      // MEMBERS / MAIN
      if(context === '') {
        if(props.position === 'left')  
          return 'Resumo de Colaboradores'; 
        if(props.position === 'right')  
          return 'Minha Conta???';
        else  
          return 'Índice de Colaboradores';
      }
      // MEMBERS / ALL
      if(context === 'all') 
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
      if(context === '') {
        if(props.position === 'left')  
          return 'Resumo de Páginas Institucionais'; 
        if(props.position === 'right')  
          return 'Definir';
        else  
          return 'Índice de Páginas';
      }
      // PAGES / ALL
      if(context === 'all') 
        return 'Índice de Páginas Institucionais';    
      // PAGES / CREATE  
      if(context === 'create') {
        if(props.position === 'left')  
          return 'Nova Página'; 
        if(props.position === 'right')  
          return 'Publicar';
      }               
      // PAGES / EDIT 
      if(context === 'edit') {
        if(props.position === 'left')  
          return 'Editar Página Institucional'; 
        if(props.position === 'right')  
          return 'Atualizar';
        else  
          return 'Definir';  
      } 
    }  

    // // CATEGORIES 
    // if(section === 'categories' && context === '')
    //   return 'Minhas Categorias';

    // if(section === 'members' && context === '')
    //   return 'Minha Conta';

    // if(section === 'pages' && context === '')
    //   return 'Minhas Páginas';
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
