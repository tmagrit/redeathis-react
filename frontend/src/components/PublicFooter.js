import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LogoFooter from './LogoFooter';
import { publicTheme, PaperFooter } from '../styles/publicStyles';

const PublicFooter = (props) => {

    const { open, show, setShow } = props;

    return (
        <ThemeProvider theme={publicTheme}> 
            <PaperFooter 
                onMouseOver={() => setShow(true)}
                onMouseOut={() => setShow(false)}
                open={open} 
                show={show} 
                sx={{ color: 'common.white', }}
            >
                <Toolbar sx={{ mt: '35px',}} >
                    <LogoFooter sx={{ flexGrow: 1 }} />
                    
                    {/* <Grid container  >
                        <Grid item sm={6} md={3}>
                            <Typography variant="overline"  sx={{ textDecoration: 'none', color: 'inherit', }} >
                                Proposição/ Coordenação 
                            </Typography> 
                        </Grid>
                        <Grid item sm={6} md={3}>
                            <Typography variant="overline"  sx={{ textDecoration: 'none', color: 'inherit', }} >
                                Parceiros 
                            </Typography> 
                        </Grid>
                        <Grid item sm={6} md={3}>
                            <Typography variant="overline"  sx={{ textDecoration: 'none', color: 'inherit', }} >
                                Fomento
                            </Typography> 
                            </Grid>
                        <Grid item sm={6} md={3}>
                            <Typography variant="overline"  sx={{ textDecoration: 'none', color: 'inherit', }} >
                                Apoio
                            </Typography> 
                        </Grid>
                    </Grid> */}
                </Toolbar> 
            </PaperFooter>
        </ThemeProvider>
    );

};

export default PublicFooter;

