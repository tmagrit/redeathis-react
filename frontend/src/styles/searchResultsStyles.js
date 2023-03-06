import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const SearchResult = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    color: 'inherit',
    width: '100%',
    textDecoration: 'none',
}));
