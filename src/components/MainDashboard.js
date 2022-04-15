import * as React from 'react';
// import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from './Copyright';

// PANELS
import TopLeftPanel from './TopLeftPanel';
import TopRightPanel from './TopRightPanel';
import MiddlePanel from './MiddlePanel';

const MainDashboard = () => {

    // REDUX SELECTORS
    // const section = useSelector(state => state.session.profile.section)
    // const context = useSelector(state => state.session.profile.context)

    return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* RESUMO */}
                <Grid item xs={12} md={8}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <TopLeftPanel />
                </Paper>
                </Grid>
                {/* MINHAS COLABORAÇÕES */}
                <Grid item xs={12} md={4}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <TopRightPanel />
                </Paper>
                </Grid>
                {/* ATIVIDADES RECENTES */}
                <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <MiddlePanel />
                </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default MainDashboard;


// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/sessionSlice';
// import { Link } from "react-router-dom";
// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiDrawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import Typography from '@mui/material/Typography';
// import { Divider } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import MenuIcon from '@mui/icons-material/Menu';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import { mainListItems, secondaryListItems } from './listItems';
// import DefaultDialog from '../components/DefaultDialog';
// import Invite from './Invite';