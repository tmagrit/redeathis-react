import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import Navigation from '../components/Navigation';
import { publicTheme } from '../styles/publicStyles';

const Home = () => {

    return (
        <ThemeProvider theme={publicTheme} > 

            <Navigation />

        </ThemeProvider>   
    );

}

export default Home;