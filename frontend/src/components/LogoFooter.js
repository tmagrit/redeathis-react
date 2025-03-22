import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
//import CasaAthis from './CasaAthis';
import { publicTheme } from '../styles/publicStyles';

const LogoFooter = () => {

    return (
        <ThemeProvider theme={publicTheme} >            
            <Box 
                component={Link} 
                to="/" 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    pr: 2,
                    textDecoration: 'none',
                }} 
            >
                <Typography component="h2" variant="footerTitle" sx={{ textDecoration: 'none', color: "#55534E", }} >
                    Laboratório de Habitação e Cidade
                </Typography>
                <Typography component="span" variant="footerBody" sx={{ textDecoration: 'none', color: "#55534E", }} >
                    Faculdade de Arquitetura da UFBA
                </Typography>
                <Typography component="span" variant="footerBody" sx={{ textDecoration: 'none', color: "#55534E", }} >
                    Rua Caetano de Moura 121, Federação, CEP: 40210-905
                </Typography>

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