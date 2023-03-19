import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
//import CasaAthis from './CasaAthis';
import { publicTheme } from '../styles/publicStyles';

const LogoFooter = () => {

    return (
        <ThemeProvider theme={publicTheme} >
            {/* <Box 
                component={Link} 
                to="/" 
                sx={{ 
                    textDecoration: 'none', 
                    color: 'text.primary', 
                }} 
            >

                <Stack direction="row" spacing={0.5} >
                    <Typography 
                        component="h1" 
                        variant="logoThin" 
                        sx={{ 
                            my: 0, 
                            textDecoration: 'none',                            
                            // position: 'relative', 
                            // top: '-0.5rem', 
                        }} 
                    >
                        REDE
                    </Typography>
                    <Typography 
                        component="h1" 
                        variant="logoThick" 
                        sx={{ 
                            my: 0, 
                            textDecoration: 'none',                            
                            // position: 'relative', 
                            // top: '-0.5rem', 
                        }} 
                    >
                        ATHIS
                    </Typography>
                </Stack>
            </Box>    */}
            
            <Box 
                component={Link} 
                to="/" 
                sx={{ 
                    textDecoration: 'none', 
                    color: 'common.white', 
                }} 
            >
                <Typography component="h2" variant="logoFooterSubtitle" sx={{ ml: 0.5, mt: 1, }} >
                    ACERVO DE REFERÊNCIAS EM CONSTRUÇÃO
                </Typography>
                <Stack direction="row" spacing={0.5} >
                    <Typography component="h1" variant="logoFooterThin" sx={{ my: 0, position: 'relative', top: '-0.5rem', textDecoration: 'none', }} >
                        REDE
                    </Typography>
                    <Typography component="h1" variant="logoFooterThick" sx={{ my: 0, position: 'relative', top: '-0.5rem', textDecoration: 'none', }} >
                        ATHIS
                    </Typography>
                </Stack>
            </Box>   

        </ThemeProvider>
    );
};

export default LogoFooter;

LogoFooter.defaultProps = {
    color: '#f4f0eb'
};

LogoFooter.propTypes = {
    color: PropTypes.string
};