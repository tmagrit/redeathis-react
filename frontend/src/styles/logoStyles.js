import { createTheme } from '@mui/material/styles';

export const logoTheme = createTheme({
    typography: {
        fontFamily: 'Montserrat, Arial',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        logoH1: {
            fontFamily: 'Montserrat', 
            fontSize: '2.25rem',
            fontWeight: 700
         },
        
        logoH2: { 
            fontFamily: 'Montserrat', 
            fontSize: '0.62rem',
            fontWeight: 400 }
    }
});