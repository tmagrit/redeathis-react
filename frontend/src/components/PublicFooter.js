import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
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
                <Toolbar 
                    disableGutters 
                    sx={{ 
                        mt: '9px', 
                        paddingLeft: '0 !important', 
                        paddingRight: '0 !important', 
                    }} 
                >

                    {/* PARTNERS TOOLBAR */}
                    <Grid container justifyContent="center" display="flex" spacing={1} >

                        {/* FOOTER 01 */}
                        <Grid item sm={2} display="flex" justifyContent="center">
                            <Box 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexGrow: 1,
                                }}
                            >
                                <Typography variant="footerTitle" sx={{ textDecoration: 'none', color: "#55534E", display: { lg: 'none', xl: 'block' } }} >
                                    Rede ATHIS: Habitação e Direito à Cidade
                                </Typography> 
                                <Typography variant="footerTitle" sx={{ textDecoration: 'none', color: "#55534E", display: { lg: 'block', xl: 'none' } }} >
                                    Rede ATHIS
                                </Typography>

                                <Divider flexItem />

                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        justifyContent: 'space-around', 
                                        alignItems: 'center', 
                                        width: '100%', 
                                        height: '7vh',
                                        pt: 1, 
                                    }}
                                >
                                    <a href="https://arquitetura.ufba.br/" target="_blank" rel="noopener noreferrer">
                                        <img src="/images/footer/faufba.png" alt="UFBA" style={{ height: '7vh' }} />
                                    </a>
                                    <a href="https://ppgau.ufba.br/" target="_blank" rel="noopener noreferrer">
                                        <img src="/images/footer/ppgau-faufba.png" alt="FAPESB" style={{ height: '7vh' }} />
                                    </a>
                                    <a href="https://labhabitar.ufba.br/" target="_blank" rel="noopener noreferrer">
                                        <img src="/images/footer/labhabitar.png" alt="CNPQ" style={{ height: '7vh' }} />
                                    </a>
                                </Box>

                                <Divider flexItem />

                                <Typography variant="footerSubtitle"  sx={{ textDecoration: 'none', color: publicTheme.palette.footerText, }} >
                                    Realização
                                </Typography>                                 
                            </Box>
                        </Grid>

                        {/* FOOTER 02 */}
                        <Grid item sm={10} display="flex" justifyContent="space-between" > 
                            <Box 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexGrow: 1,
                                }}
                            >
                                <Typography variant="footerTitle"  sx={{ textDecoration: 'none', color: "#55534E", }} >
                                    Rede ATHIS e Territórios Periféricos na Bahia
                                </Typography> 

                                <Divider flexItem />

                                <Grid container justifyContent="center" display="flex" spacing={2}>

                                    {/* FOOTER 02.1 */}
                                    <Grid 
                                        item 
                                        sm={6} 
                                        display="flex" 
                                        justifyContent="center" 
                                        alignItems="center" 
                                        flexDirection="column"
                                    >
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                flexDirection: 'row', 
                                                justifyContent: 'space-around', 
                                                alignItems: 'center', 
                                                flexGrow: 1,
                                                width: '100%', 
                                                height: '7vh',
                                                pt: 1, 
                                            }}
                                        >
                                            <a href="https://arquitetura.ufba.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/faufba.png" alt="UFBA" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://ppgau.ufba.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/ppgau-faufba.png" alt="FAPESB" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://labhabitar.ufba.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/labhabitar.png" alt="CNPQ" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://etnicidadesufba.blogspot.com/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/etnicidades.png" alt="UFBA" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://ppec.ufba.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/ppec.png" alt="FAPESB" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://www.cetrama.ufba.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/cetrama.png" alt="CNPQ" style={{ height: '7vh' }} />
                                            </a>                                            
                                        </Box>

                                        <Divider flexItem />

                                        <Typography variant="footerSubtitle"  sx={{ textDecoration: 'none', color: publicTheme.palette.footerText, }} >
                                            Realização
                                        </Typography> 
                                    </Grid>

                                    {/* FOOTER 02.2 */}
                                    <Grid 
                                        item 
                                        sm={3} 
                                        display="flex" 
                                        justifyContent="center" 
                                        alignItems="center" 
                                        flexDirection="column"
                                    >

                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                flexDirection: 'row', 
                                                justifyContent: 'space-around', 
                                                alignItems: 'center', 
                                                flexGrow: 1,
                                                width: '100%', 
                                                height: '7vh',
                                                pt: 1, 
                                            }}
                                        >

                                            <a href="https://www.ucv.edu.pe/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/ucv.png" alt="UFBA" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://uac.bj/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/uac.png" alt="FAPESB" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://ufsb.edu.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/ufsb.png" alt="CNPQ" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://www.ufs.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/ufs.png" alt="CNPQ" style={{ height: '7vh' }} />
                                            </a>

                                        </Box>

                                        <Divider flexItem />

                                        <Typography variant="footerSubtitle"  sx={{ textDecoration: 'none', color: publicTheme.palette.footerText, }} >
                                            Parcerias
                                        </Typography> 


                                    </Grid>

                                    {/* FOOTER 02.3 */}
                                    <Grid 
                                        item 
                                        sm={3} 
                                        display="flex" 
                                        justifyContent="center" 
                                        alignItems="center" 
                                        flexDirection="column"
                                    >

                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                flexDirection: 'row', 
                                                justifyContent: 'space-around', 
                                                alignItems: 'center', 
                                                flexGrow: 1,
                                                width: '100%', 
                                                height: '7vh',
                                                pt: 1, 
                                            }}
                                        >
                                            <a href="https://www.fapesb.ba.gov.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/fapesb.png" alt="UFBA" style={{ height: '7vh' }} />
                                            </a>
                                            <a href="https://cnpq.br/" target="_blank" rel="noopener noreferrer">
                                                <img src="/images/footer/cnpq.png" alt="FAPESB" style={{ height: '7vh' }} />
                                            </a>
                                        </Box>

                                        <Divider sx={{ width: '100%', flex: '1 1 auto' }} flexItem />

                                        <Typography variant="footerSubtitle"  sx={{ textDecoration: 'none', color: publicTheme.palette.footerText, }} >
                                            Apoio
                                        </Typography> 

                                        </Grid>
                                    </Grid>

                            </Box>
                            

                        </Grid>

                        {/* ADDRESS TOOLBAR */}
                        <Grid item xs={12} display="flex" justifyContent="center"  >
                            <LogoFooter sx={{ flexGrow: 1 }} />
                        </Grid>

                    </Grid> 

                </Toolbar> 
            </PaperFooter>
        </ThemeProvider>
    );

};

export default PublicFooter;

