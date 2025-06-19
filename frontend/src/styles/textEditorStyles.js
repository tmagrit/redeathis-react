// import { createTheme } from '@mui/material';
// import { adminTheme } from '../styles/adminStyles';

// const theme = createTheme(adminTheme);

export const overviewContentStyle = `
	body {
	  font-family: 'Roboto';
	  font-size: 16px;
	  font-weight: 300;
	  background-color: #f4f0eb;
	}
	h1 {
		font-family: 'Aberforth';
		font-weight: 300;
		font-size: 32px;
		text-transform: uppercase;
		margin-block-start: 20px;
		margin-block-end: 20px;
		color: #f5a449;
	}
	h2 {
	  font-family: 'Aberforth';
	  font-weight: 300;
	  font-size: 25px;
	  text-transform: uppercase;
	  margin-block-start: 16px;
	  margin-block-end: 16px;
	  color: #f5a449;
	}
	h3 {
	  font-family: 'Roboto';
	  font-weight: 500;
	  margin-block-start: 13px;
	  margin-block-end: 13px;
	  font-size: 20px;
	}
	h4 {
	  font-family: 'Roboto';
	  font-weight: 400;
	  margin-block-start: 10px;
	  margin-block-end: 10px;
	  font-size: 16px;
	}
  `;

  export const teamContentStyle = `
	body {
	  font-family: 'Roboto';
	  font-size: 16px;
	  font-weight: 300;
	  background-color: #f4f0eb;
	}
	h1 {
		font-family: 'Aberforth';
		font-weight: 300;
		font-size: 32px;
		text-transform: uppercase;
		margin-block-start: 20px;
		margin-block-end: 20px;
		color: #981F62;
	}
	h2 {
	  font-family: 'Aberforth';
	  font-weight: 300;
	  font-size: 25px;
	  text-transform: uppercase;
	  margin-block-start: 16px;
	  margin-block-end: 16px;
	  color: #981F62;
	}
	h3 {
	  font-family: 'Roboto';
	  font-weight: 500;
	  margin-block-start: 13px;
	  margin-block-end: 13px;
	  font-size: 20px;
	}
	h4 {
	  font-family: 'Roboto';
	  font-weight: 400;
	  margin-block-start: 10px;
	  margin-block-end: 10px;
	  font-size: 16px;
	}
  `;

export  const overviewStyleFormats = [
	{ title: 'Título 1', block: 'h1', classes: 'institutional-h1' },
	{ title: 'Título 2', block: 'h2', classes: 'institutional-h2' },
	{ title: 'Título 3', block: 'h3', classes: 'institutional-h3' },
	{ title: 'Título 4', block: 'h4', classes: 'institutional-h4' },
	{ title: 'Parágrafo', block: 'p', classes: 'institutional-body' },
  ];

export const teamStyleFormats = [
	{ title: 'Título 1', block: 'h1', classes: 'team-h1' },
	{ title: 'Título 2', block: 'h2', classes: 'team-h2' },
	{ title: 'Título 3', block: 'h3', classes: 'team-h3' },
	{ title: 'Título 4', block: 'h4', classes: 'team-h4' },
	{ title: 'Parágrafo', block: 'p', classes: 'institutional-body' },
  ];
