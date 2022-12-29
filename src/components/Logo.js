import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import CasaAthis from './CasaAthis';
import { logoTheme } from '../styles/logoStyles';

import "@fontsource/montserrat";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";

const Logo = (props) => {

    const { color } = props;

    return (
        <ThemeProvider theme={logoTheme} >
            <Box 
                sx={{ 
                    position: 'absolute', 
                    zIndex: 100, 
                    margin: 0,
                    top: 4,
                    left: 1.1
                }}
            >
                <Stack direction="row" spacing={0} >
                    <Box>
                        <Typography component="h2" variant="logoH2" sx={{ flexgrow: 1, color: color, ml: 1.1, }} >
                            ACERVO DE REFERÊNCIAS EM CONSTRUÇÃO
                        </Typography>
                        <Typography component="h1" variant="logoH1" sx={{ flexgrow: 1, color: color, position: 'relative', top: '-0.3rem', ml: 0.8, }} >
                            REDE ATHIS
                        </Typography>
                    </Box>

                    <CasaAthis scale='2.75rem' fill={color} />
                </Stack>
            </Box>    
        </ThemeProvider>
    );
};

export default Logo;

Logo.defaultProps = {
    color: '#fff'
    // width: '1rem',
    // height: '1rem',
    // fill: '#fff',
    // stroke: '#fff',
    // strokeWidth: 0

};

Logo.propTypes = {
    color: PropTypes.string,
    // width: PropTypes.string,
    // height: PropTypes.string,
    // fill: PropTypes.string,
    // stroke: PropTypes.string,
    // strokeWidth: PropTypes.number
};