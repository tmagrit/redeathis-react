import { styled, createTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 260; // TODO CREATE STYLE FILE

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      //STYLES UPDATE <---
      borderBottom: 1,
      borderColor: 'divider',
      //background: 'rgba(244, 240, 235, 0.65)',
      //STYLES UPDATE --->
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }),
);



//export const adminTheme = createTheme();

export const adminTheme = createTheme({
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

        // pp: {
        //     light: '#85cccf',
        //     main: '#33a8aa',
        //     dark: '#1c8b8a',
        //     contrastText: '#fff',            
        // },
        
        // ic: {
        //     light: '#c6cae1',
        //     main: '#33377A',
        //     dark: '#272663',
        //     contrastText: '#fff',
        // },

        // pe: {
        //     light: '#fd97bf',
        //     main: '#BE266A',
        //     dark: '#981f62',
        //     contrastText: '#fff',
        // },

        // ls: {
        //     light: '#fbd2d4',
        //     main: '#EB6145',
        //     dark: '#ca4e3d',
        //     contrastText: '#fff',
        // },

        text: {
            primary: 'rgba(13, 11, 7, 0.87)',
            secondary: 'rgba(13, 11, 7, 0.6)',
            disabled: 'rgba(13, 11, 7, 0.38)',
        },

        //footerText: '#CFC1AD',

        divider: 'rgba(13, 11, 7, 0.12)',

        background: {
            paper: '#f4f0eb',
            default: '#f4f0eb',
            striped: '#EBE5DF',
            hovered: '#E1DDD9',
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
            minHeight: 60,
            "@media (min-width:0px)": {
                "@media (orientation: landscape)": {
                    minHeight: 48,
                    paddingLeft: 20,
                    paddingRight: 20,
                },
            },
            "@media (min-width:600px)": { 
                minHeight: 48, 
                paddingLeft: 20,
                paddingRight: 20,

            },
            "@media (min-width:900px)": { 
                minHeight: 60, 
                paddingLeft: 20,
                paddingRight: 20,

            },
            "@media (min-width:1200px)": { 
                minHeight: 60, 
                paddingLeft: 20,
                paddingRight: 20,

            },
        },
    },

    typography: {
        fontFamily: 'Roboto, Arial',
        fontWeightLight: 200,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        // logoThin: {
        //     fontFamily: 'Montserrat', 
        //     fontSize: '1.8rem',
        //     fontWeight: 300
        // },
        // logoThick: {
        //     fontFamily: 'Montserrat', 
        //     fontSize: '1.8rem',
        //     fontWeight: 800
        // }, 

        // logoFooterThin: {
        //     fontFamily: 'Montserrat', 
        //     fontSize: '2.1rem',
        //     fontWeight: 300
        // },
        // logoFooterThick: {
        //     fontFamily: 'Montserrat', 
        //     fontSize: '2.1rem',
        //     fontWeight: 800
        // }, 
        // footerTitle: { 
        //     fontFamily: 'Roboto', 
        //     fontSize: '0.8rem',
        //     fontWeight: 600 
        // },
        // footerSubtitle: { 
        //     fontFamily: 'Roboto', 
        //     fontSize: '0.7rem',
        //     fontWeight: 200,
        //     textTransform: 'uppercase', 
        // },
        // footerBody: { 
        //     fontFamily: 'Roboto', 
        //     fontSize: '0.8rem',
        //     fontWeight: 200, 
        // },
        // mainNavigationItem: { 
        //     fontFamily: 'Aberforth', 
        //     fontSize: '1.5rem',
        //     fontWeight: 400 
        // },
        // viewResearchTitle: { 
        //     fontFamily: 'Aberforth', 
        //     fontSize: '1.5rem',
        //     fontWeight: 400, 
        //     textTransform: 'uppercase', 
        // },
        // clickInfoTitle: { 
        //     fontFamily: 'Aberforth', 
        //     fontSize: '1.5rem',
        //     fontWeight: 400, 
        //     textTransform: 'uppercase', 
        // },
        // searchResultsTitle: { 
        //     fontFamily: 'Aberforth', 
        //     fontSize: '1.2rem',
        //     fontWeight: 400, 
        //     textTransform: 'uppercase', 
        // },
    },

    // components: {
    //     MuiChip: {
    //         defaultProps: {
    //             variant: 'filled',
    //             clickable: true, 
    //             size: 'small',
    //         },
    //         styleOverrides: {
    //             root: {
    //               fontSize: '9px',
    //               textTransform: 'uppercase',
    //               //padding: 0,
    //             },
    //         },

    //     },
    // },
});