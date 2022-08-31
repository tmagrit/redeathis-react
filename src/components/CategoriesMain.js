import * as React from 'react';

import { useState, useEffect } from 'react';
import { updateResearch } from '../features/researchSlice';
import { useSelector, useDispatch } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarksIcon from '@mui/icons-material/Bookmarks'; 
import EditIcon from '@mui/icons-material/Edit';  
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Copyright from './Copyright';
import Title from './Title';   

import DefaultDialog from './DefaultDialog';
import ClassesEdit from './ClassesEdit';

import { categoryTitle } from './categoryTitle';

const CategoriesMain = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const categories = useSelector(state => state.research.categories);   
    const tags = useSelector(state => state.research.tags);   
    
    // DIALOG STATES 
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = (value) => {
        setDialogOpen(false);
    };    

    // HANDLE CLASS EDIT
    const handleClassEdit = (categoryid) => {
        setSelectedCategory(categoryid);
        handleDialogOpen(true);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* LEFT PANEL */}
                <Grid item xs={12} >
                    {categories && categories.map(c => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={c.name}
                                id={c.id}
                            >
                                <Stack direction="row"  alignItems="center" spacing={1.5} >
                                    <Avatar sx={{ width: 15, height: 15, bgcolor: `${c.color}` }}> </Avatar>
                                    <Typography > {categoryTitle(c.name)} </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        {c.classes && c.classes.map(cc => (
                                            <Grid item xs={4}>
                                                <Stack 
                                                    direction="row" 
                                                    alignItems="center"
                                                    spacing={0.7}
                                                    sx={{ mt:1, mb:1, }}
                                                >
                                                    <Typography variant="body1" sx={{ display: 'inline', fontWeight: 'bold', flexGrow: 1, }}>{cc.name}</Typography>
                                                    <IconButton aria-label="edit" size="small">
                                                        <EditIcon fontSize="inherit" />
                                                    </IconButton>
                                                </Stack>
                                                <Divider />
                                                <List dense >
                                                    {tags && tags.filter(t => t.class_id === cc.id).map(ct => (
                                                        <ListItem key={ct.id}>
                                                            <ListItemText primary={ct.name} />
                                                        </ListItem>

                                                    ))}    
                                                </List>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Stack direction="row-reverse" sx={{ mt: 5, }} >
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            endIcon={<BookmarksIcon />} 
                                            onClick={() => handleClassEdit(c.id)} 
                                        >
                                            Incluir Classes em {c.name}
                                        </Button>
                                    </Stack>

                                </Box>

                                {/* <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography> */}

                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>

                {/* RIGHT PANEL 
                <Grid item xs={12} md={4}>
                    <Paper sx={{ minHeight: 240, }} >
                        <Grid item xs={12} sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', }}>
                            <Title position={'right'}/> 
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                            
                        </Grid>
                    </Paper>
                </Grid> */}
                
            </Grid>

            {/* MANAGE CLASS DIALOG */}
            <DefaultDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                title={`Criar Classes em ${selectedCategory && categories.find(c => c.id === selectedCategory).name}`}
                //title="TEMP"
                children={<ClassesEdit categoryId={selectedCategory} />}
            />

            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default CategoriesMain;
