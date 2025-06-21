import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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
                    alignItems: 'center',
                    //pt: 1,
                    textDecoration: 'none',
                    flexGrow: 1
                }} 
            >
                <Typography component="h2" variant="footerTitle" sx={{ textDecoration: 'none', color: "#55534E", }} >
                    Laboratório de Habitação e Cidade
                </Typography>

                <Divider flexItem />
                
                <Typography component="span" variant="footerBody" sx={{ textDecoration: 'none', color: "#55534E", }} >
                    Faculdade de Arquitetura da UFBA
                </Typography>
                <Typography component="span" variant="footerBody" sx={{ textDecoration: 'none', color: "#55534E", }} >
                    Rua Caetano de Moura 121, Federação, CEP: 40210-905
                </Typography>
                <Typography component="span" variant="footerBody" sx={{ textDecoration: 'none', color: "#55534E", }} >
                    Salvador, Bahia, Brasil, Tel: 71 3283-5896
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