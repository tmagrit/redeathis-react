import * as React from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from "luxon";
import Title from './Title';

// REACT DATA TABLE COMPONENT
import DataTable from 'react-data-table-component';


const MiddlePanel = () => {

  function titleGenerator(section, context) {
        
    // MAIN DASHBOARD TITLES 
    if(section === 'research' && context === '')
        return 'Pesquisa';
    
    if(section === 'categories' && context === '')
        return 'Categorias';

    if(section === 'members' && context === '')
        return 'Colaboradores';
    
    if(section === 'pages' && context === '')
        return 'Páginas';
};

 // REDUX SELECTORS
 const profilesData = useSelector(state => state.members.profiles);
 const section = useSelector(state => state.session.profile.section);
 const context = useSelector(state => state.session.profile.context);

 const profilesColumns = [
  {
      name: 'ID',
      selector: row => row.ind,
      visible: false,
  },
  {
      name: 'Nome',
      selector: row => row.name + ' ' + row.surname ,
  },
  {
      name: 'Ativo',
      selector: row => row.active,
  },
  {
      name: 'Última Atualização',
      //selector: row => Date(row.updated_at).toLocaleDateString('en-US'),
      selector: row => DateTime.fromISO(row.updated_at).setLocale('pt-br').toFormat('yyyy LLL dd'),
  },
  {
      name: 'Colaborador Desde',
      selector: row => row.created_at,
  },
];

  return (
    <React.Fragment>
      <Title>{titleGenerator(section, context)}</Title>
      <DataTable
            columns={profilesColumns}
            data={profilesData}
            selectableRows
            pagination
        />
    </React.Fragment>
  );
};

export default MiddlePanel;








///////////////////////////////////////////////////////////////

// import Link from '@mui/material/Link';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';

///////////////////////////////////////

// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Projetos e Programas',
//     'Angela',
//     'Publicado',
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'Projetos e Programas',
//     'Isis',
//     'Análise',
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Legislação e Suporte', 'Elenaldo', 'Publicado'),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Publicações e Eventos',
//     'Angela',
//     'Lixeira',
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Instituições e Assessorias',
//     'Isis',
//     'Publicado',
//   ),
// ];

// function preventDefault(event) {
//   event.preventDefault();
// }

// const MiddlePanel = () => {

//   // REDUX SELECTORS
//   const section = useSelector(state => state.session.profile.section);
//   const context = useSelector(state => state.session.profile.context);

//   return (
//     <React.Fragment>
//       <Title>Atividades Recentes</Title>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Data</TableCell>
//             <TableCell>Item</TableCell>
//             <TableCell>Categoria</TableCell>
//             <TableCell>Colaborador</TableCell>
//             <TableCell align="right">Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.date}</TableCell>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.shipTo}</TableCell>
//               <TableCell>{row.paymentMethod}</TableCell>
//               <TableCell align="right">{row.amount}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
//         Ver Todas
//       </Link>
//     </React.Fragment>
//   );
// };

// export default MiddlePanel;