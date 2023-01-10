import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const SearchResult = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    //marginRight: theme.spacing(2),
    //marginLeft: 0,
    color: 'inherit',
    width: '100%',
    //width: 'auto',
    textDecoration: 'none',

    // [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: 'auto',
    // },

    }));
