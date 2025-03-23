import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryLegendGrade } from '../features/researchSlice'; 
import { ThemeProvider } from '@mui/material';
import Stack from '@mui/material/Stack';
//import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { publicTheme, PaperLegend } from '../styles/publicStyles';

const PublicMenuBar = (props) => {

    const { open, show } = props;

    // REDUX SELECTORS
    const categorieLegendGrade = useSelector(selectCategoryLegendGrade); console.log('categorieLegendGrade', categorieLegendGrade);

    if(categorieLegendGrade.length > 0)
        return ( 
            <ThemeProvider theme={publicTheme} > 
                <PaperLegend 
                    show={show}
                    open={open}
                    elevation={6} 
                    square
                    sx={{
                        position: 'absolute',
                        background: 'rgba(244, 240, 235, 0.75)', 
                        zIndex: 900, 
                        ml: 5,
                        padding: 2,
                        //bottom: 600,
                        bottom: 140,
                        left: 100
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
                                <Typography 
                                    variant="caption" 
                                    component="div" 
                                    sx={{ 
                                        fontWeight: 'bold', 
                                        textTransform: 'uppercase' 
                                    }} 
                                >
                                    {`${couple[0].description}`}
                                </Typography>
                                <Typography 
                                    variant="caption" 
                                    component="div" 
                                >
                                    {`(${couple[0].name} e ${couple[1].name})`}
                                </Typography> 
                            </Stack>
                        )
                    })}
                </PaperLegend>
            </ThemeProvider > 
        )
    else 
        return null;
};

export default PublicMenuBar;