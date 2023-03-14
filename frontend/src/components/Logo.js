import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
//import CasaAthis from './CasaAthis';
import { publicTheme } from '../styles/publicStyles';

const Logo = () => {

    return (
        <ThemeProvider theme={publicTheme} >
            <Box 
                component={Link} 
                to="/" 
                sx={{ 
                    textDecoration: 'none', 
                    color: 'text.primary', 
                }} 
            >
                {/* <Typography component="h2" variant="logoSubtitle" sx={{ ml: 0.5, mt: 1, }} >
                    ACERVO DE REFERÊNCIAS EM CONSTRUÇÃO
                </Typography> */}
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
            </Box>   
            
            
            
            
            
            

            {/* LOGO WITH SUBTITLES
            
            <Box 
                component={Link} 
                to="/" 
                sx={{ 
                    textDecoration: 'none', 
                    color: 'text.primary', 
                }} 
            >
                <Typography component="h2" variant="logoSubtitle" sx={{ ml: 0.5, mt: 1, }} >
                    ACERVO DE REFERÊNCIAS EM CONSTRUÇÃO
                </Typography>
                <Stack direction="row" spacing={0.5} >
                    <Typography component="h1" variant="logoThin" sx={{ my: 0, position: 'relative', top: '-0.5rem', textDecoration: 'none', }} >
                        REDE
                    </Typography>
                    <Typography component="h1" variant="logoThick" sx={{ my: 0, position: 'relative', top: '-0.5rem', textDecoration: 'none', }} >
                        ATHIS
                    </Typography>
                </Stack>
            </Box>    */}




            
            
            
            
            
            {/* <Box 
                sx={{ 
                    position: 'absolute', 
                    zIndex: 100, 
                    margin: 0,
                    top: 4,
                    left: 15
                }}
            >
                <Stack direction="row" spacing={0} >
                    <Box>
                        <Typography component="h2" variant="logoH2" sx={{ flexgrow: 1, color: color, textDecoration: 'none', }} >
                            ACERVO DE REFERÊNCIAS EM CONSTRUÇÃO
                        </Typography>
                        <Typography component="h1" variant="logoH1" sx={{ flexgrow: 1, color: color, position: 'relative', top: '-0.3rem', }} >
                            REDE ATHIS
                        </Typography>
                    </Box>

                    <CasaAthis scale='2.75rem' fill={color} />
                </Stack>
            </Box>     */}
        </ThemeProvider>
    );
};

export default Logo;

Logo.defaultProps = {
    color: '#fff'
};

Logo.propTypes = {
    color: PropTypes.string
};