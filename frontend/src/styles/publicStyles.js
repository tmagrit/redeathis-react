import { createTheme } from '@mui/material/styles';
import "@fontsource/montserrat";
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";

export const publicTheme = createTheme({
    palette: {
        
        common: {
            black: '#846a47',
            white: '#f4f0eb'
        },
        primary: {
          // light: will be calculated from palette.primary.main,
          light: '#bca68c',
          main: '#846a47',
          dark: '#624824',
          contrastText: '#f5e9d6',
        },
        secondary: {
          light: '#74bee6',
          main: '#66a5d2', 
          dark: '#5681a9',
          contrastText: '#e6f6fc',
        },

        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },

        divider: 'rgba(0, 0, 0, 0.12)',

        background: {
            paper: '#efe9e1',
            default: '#f4f0eb',
        },

        action:{
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            hoverOpacity: 0.04,
            selected: 'rgba(0, 0, 0, 0.08)',
            selectedOpacity: 0.08,
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(0, 0, 0, 0.12)',
            focusOpacity: 0.12,
            activatedOpacity: 0.12,
        },

        // custom: {
        //   light: '#ffa726',
        //   main: '#f57c00',
        //   dark: '#ef6c00',
        //   contrastText: 'rgba(0, 0, 0, 0.87)',
        // },

        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,

        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },



    shape: {
        borderRadius: 0,
    },


    typography: {
        fontFamily: 'Montserrat, Arial',
        fontWeightLight: 200,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        logoThin: {
            fontFamily: 'Montserrat', 
            fontSize: '2.5rem',
            fontWeight: 300
        },
        logoThick: {
            fontFamily: 'Montserrat', 
            fontSize: '2.5rem',
            fontWeight: 800
        }, 
        
        logoSubtitle: { 
            fontFamily: 'Montserrat', 
            fontSize: '0.65rem',
            fontWeight: 400 
        }
    }
});