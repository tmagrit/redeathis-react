import * as React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

 const TopRightPanel = () => {
  
  // REDUX SELECTORS
  const profile = useSelector(state => state.session.profile);
  const section = useSelector(state => state.session.profile.section);
  const context = useSelector(state => state.session.profile.context);

  function titleGenerator(section, context) {
        
    // MAIN DASHBOARD TITLES 
    if(section === 'research' && context === '')
        return 'Minha Pesquisa';
    
    if(section === 'categories' && context === '')
        return 'Minhas Categorias';

    if(section === 'members' && context === '')
        return 'Minha Conta';
    
    if(section === 'pages' && context === '')
        return 'Minhas Páginas';
};
  
  return (
    <React.Fragment>
      <Title>{titleGenerator(section, context)}</Title>
      {/* <Typography component="p" variant="h5">
        {profile ? `Olá, ${profile?.name}!` : 'Olá'}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Veja aqui duas principais contribuições na plataforma.
      </Typography> 
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver todas
        </Link>
      </div>*/}
    </React.Fragment>
  );
};

export default TopRightPanel;