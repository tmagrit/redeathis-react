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
export const footerHeight = 150;

export const PaperControls = styled(MuiPaper, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, show }) => ({
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
            marginRight: drawerWidth - 1,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
        ...(show && {
            marginBottom: `${footerHeight - 30}px`,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),        
        ...(open && show && {
            marginRight: drawerWidth - 1,
            marginBottom: `${footerHeight - 30}px`, 
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }),
);

export const Main = styled('main', { 
    shouldForwardProp: (prop) => prop !== 'open' 
    })(({ theme, open }) => ({
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

export const PaperFooter = styled(MuiPaper, {
    shouldForwardProp: (prop) => prop !== 'open',
    shouldForwardProp: (prop) => prop !== 'show',
    })(({ theme, open, show }) => ({
        zIndex: 2000,
        height: '30px',
        background: 'linear-gradient(to top, rgba(13, 11, 7,0.5) 0%, rgba(13, 11, 7,0) 100%)',
        position: 'fixed',
        width: '100%',
        bottom: 0,
        transition: theme.transitions.create(['margin', 'width', 'height'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width', 'height'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
    ...(show && {
        transition: theme.transitions.create(['margin', 'width', 'height', 'background'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: '#0D0B07',
        height: `${footerHeight}px`,
    }),
    ...(show && open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width', 'height', 'background'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: '#0D0B07',
        marginRight: drawerWidth,
        height: `${footerHeight}px`,
    }),
}));

export const PaperLegend = styled(MuiPaper, {
    shouldForwardProp: (prop) => prop !== 'open',
    shouldForwardProp: (prop) => prop !== 'show',
    })(({ theme, open, show }) => ({
        position: 'absolute',
        background: 'rgba(244, 240, 235, 0.75)', 
        zIndex: 900, 
        ml: 1.1,
        padding: 2,
        bottom: 40,
        left: 1.1,
        transition: theme.transitions.create(['margin', 'width', 'height', 'opacity'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        opacity: '0',
        transition: theme.transitions.create(['margin', 'width', 'height', 'opacity'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(show && {
        marginBottom: `${footerHeight - 30}px`, 
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(show && open && {
        //width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width', 'height', 'background'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const publicTheme = createTheme({
    palette: {
        common: {
            black: '#0D0B07',
            white: '#f4f0eb'
        },
        primary: {
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

        // OLD CUSTOM RESEARCH PALETTE STYLES
        //     blue: '#4285F4',
        //     red: '#EA4335',
        //     yellow: '#FBBC05',
        //     green: '#34A853'
        pp: {
            light: '#85cccf',
            main: '#33a8aa',
            dark: '#1c8b8a',
            contrastText: '#fff',            
        },
        
        ic: {
            light: '#c6cae1',
            main: '#33377A',
            dark: '#272663',
            contrastText: '#fff',
        },

        pe: {
            light: '#fd97bf',
            main: '#BE266A',
            dark: '#981f62',
            contrastText: '#fff',
        },

        ls: {
            light: '#fbd2d4',
            main: '#EB6145',
            dark: '#ca4e3d',
            contrastText: '#fff',
        },

        text: {
            primary: 'rgba(13, 11, 7, 0.87)',
            secondary: 'rgba(13, 11, 7, 0.6)',
            disabled: 'rgba(13, 11, 7, 0.38)',
        },

        divider: 'rgba(13, 11, 7, 0.12)',

        background: {
            // paper: '#efe9e1', // DEPRECATED STYLE
            paper: '#f4f0eb',
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
                paddingLeft: 48,
                paddingRight: 48,

            },
        },
    },

    typography: {
        fontFamily: 'Roboto, Arial',
        fontWeightLight: 200,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        logoThin: {
            fontFamily: 'Montserrat', 
            fontSize: '1.8rem',
            fontWeight: 300
        },
        logoThick: {
            fontFamily: 'Montserrat', 
            fontSize: '1.8rem',
            fontWeight: 800
        }, 

        logoFooterThin: {
            fontFamily: 'Montserrat', 
            fontSize: '2.1rem',
            fontWeight: 300
        },
        logoFooterThick: {
            fontFamily: 'Montserrat', 
            fontSize: '2.1rem',
            fontWeight: 800
        }, 
        logoFooterSubtitle: { 
            fontFamily: 'Montserrat', 
            fontSize: '0.56rem',
            fontWeight: 200 
        },
        mainNavigationItem: { 
            fontFamily: 'Aberforth', 
            fontSize: '1.5rem',
            fontWeight: 400 
        },
        clickInfoTitle: { 
            fontFamily: 'Aberforth', 
            fontSize: '1.5rem',
            fontWeight: 40, 
            textTransform: 'uppercase', 
        },
    },

    components: {
        MuiChip: {
            defaultProps: {
                variant: 'filled',
                clickable: true, 
                size: 'small',
            },
            styleOverrides: {
                root: {
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  //padding: 0,
                },
            },

        },
    },
});