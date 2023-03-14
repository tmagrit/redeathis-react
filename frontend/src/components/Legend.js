import * as React from 'react';
import { useSelector } from 'react-redux';
import { categoryLegendGrade } from '../features/researchSlice'; 
import { ThemeProvider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { publicTheme } from '../styles/publicStyles';

const PublicMenuBar = () => {

    // REDUX SELECTORS
    const categorieLegendGrade = useSelector(categoryLegendGrade);

    if(categorieLegendGrade.length > 0)
        return ( 
            <ThemeProvider theme={publicTheme} > 
                <Paper 
                    elevation={1} 
                    square
                    sx={{
                        position: 'absolute',
                        background: 'rgba(244, 240, 235, 0.75)', 
                        zIndex: 900, 
                        mr: 1.1,
                        padding: 2,
                        bottom: 40,
                        right: 1.1
                    }}
                > 
                    {categorieLegendGrade.map(couple => {
                        return (
                            <Stack 
                                direction="row" 
                                alignItems="center"
                                spacing={1} 
                                sx={{ pb: 0.5, '&:last-child': { pb: 0 }, }}
                                key={couple[0].id}
                            >
                                <Avatar sx={{ width: 10, height: 10, bgcolor: `${couple[0].color}` }}> </Avatar>
                                <Typography variant="caption" component="div" >{`${couple[0].name} e ${couple[1].name}`}</Typography> 
                            </Stack>
                        )
                    })}
                </Paper>
            </ThemeProvider > 
        )
    else 
        return null;
};

export default PublicMenuBar;