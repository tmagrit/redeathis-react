import * as React from 'react';
import { useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function TopRightPanel() {
  
  // REDUX SELECTORS
  const profile = useSelector(state => state.session.profile)
  
  return (
    <React.Fragment>
      <Title>Minhas Colaborações</Title>
      <Typography component="p" variant="h5">
        {`Olá, ${profile?.name}!`}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Veja aqui duas principais contribuições na plataforma.
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver todas
        </Link>
      </div>
    </React.Fragment>
  );
}