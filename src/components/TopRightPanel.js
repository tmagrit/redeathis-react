import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Title from './Title';

// function preventDefault(event) {
//   event.preventDefault();
// }

 const TopRightPanel = () => {
  
  // REDUX SELECTORS
  const categories = useSelector(state => state.research.categories);
  const statuses = useSelector(state => state.research.statuses);
  const section = useSelector(state => state.session.section);
  const context = useSelector(state => state.session.context);

  // CHANGE RESEARCH STATES
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(statuses[1].status || '');
  const [geolocation, setGeolocation] = useState({});
  const [date, setDate] = useState({});

  // CHANGE RESEARCH STATES
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  function titleGenerator(section, context) {
        
    // MAIN DASHBOARD TITLES 
    if(section === 'research' && context === '')
        return 'Minha Pesquisa';
    if(section === 'research' && context === 'create')
        return 'Publicar';    
    
    if(section === 'categories' && context === '')
        return 'Minhas Categorias';

    if(section === 'members' && context === '')
        return 'Minha Conta';
    
    if(section === 'pages' && context === '')
        return 'Minhas Páginas';
};
  
  return (
    <React.Fragment>
      {/* <Title position={'left'}/> */}
      <TextField
        id="status"
        select
        label="Status"
        size="small"
        value={status}
        onChange={handleChangeStatus}
        sx={{ my: 1,}}
        InputLabelProps={{ shrink: true }}
      >
        {statuses.map((c) => (
          <MenuItem key={c.id} value={c.status}>
            {c.status}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="category"
        select
        label="Categoria"
        size="small"
        value={category}
        onChange={handleChangeCategory}
        sx={{ my: 1,}}
        InputLabelProps={{ shrink: true }}
      >
        {categories.map((c) => (
          <MenuItem key={c.id} value={c.name}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );
};

export default TopRightPanel;