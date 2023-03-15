import { createTheme, styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiPaper from '@mui/material/Paper';
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

export const drawerWidth = 420;

export const Paper = styled(MuiPaper, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: 'rgba(244, 240, 235, 0.65)',
        position: 'absolute', 
        zIndex: 900, 
        bottom: 40,
        right: 1.1,
        marginRight: 10,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth - 1,
        }),
    }),
);

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: '90%',
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        borderBottom: 1,
        borderColor: 'divider',
        background: 'rgba(244, 240, 235, 0.65)',
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

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

        // CUSTOM RESEARCH PALETTE STYLES
        //     blue: '#4285F4',
        //     red: '#EA4335',
        //     yellow: '#FBBC05',
        //     green: '#34A853'
        pp: {
            light: '#dd7271',
            main: '#4285F4',
            dark: '#3d62cd',
            contrastText: '#fff',            
        },
        
        ic: {
            light: '#e6534e',
            main: '#EA4335',
            dark: '#c9312e',
            contrastText: '#fff',
        },

        pe: {
            light: '#fbc009',
            main: '#FB9D00',
            dark: '#fb6f00',
            contrastText: '#fff',
        },

        ls: {
            light: '#5cc275',
            main: '#34a853',
            dark: '#1f843c',
            contrastText: '#fff',
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

    mixins: {
        toolbar: {
            minHeight: 48,
            "@media (min-width:0px)": {
                "@media (orientation: landscape)": {
                    minHeight: 48,
                },
            },
            "@media (min-width:600px)": { 
                minHeight: 48, 
            },
        },
    },

    typography: {
        fontFamily: 'Montserrat, Arial',
        fontWeightLight: 200,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        logoThin: {
            fontFamily: 'Montserrat', 
            //fontSize: '2.5rem',
            fontSize: '1.8rem',
            fontWeight: 300
        },
        logoThick: {
            fontFamily: 'Montserrat', 
            //fontSize: '2.5rem',
            fontSize: '1.8rem',
            fontWeight: 800
        }, 
        
        logoSubtitle: { 
            fontFamily: 'Montserrat', 
            fontSize: '0.65rem',
            fontWeight: 400 
        }
    }
});