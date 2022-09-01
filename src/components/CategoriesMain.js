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
import DeleteIcon from '@mui/icons-material/Delete'; 
import LabelIcon from '@mui/icons-material/Label';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Copyright from './Copyright';
import Title from './Title';   

import DefaultDialog from './DefaultDialog';
import ClassesEdit from './ClassesEdit';
import TagsEdit from './TagsEdit';

import { categoryTitle } from './categoryTitle';

const CategoriesMain = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const categories = useSelector(state => state.research.categories);  
    const classes  = useSelector(state => state.research.classes);   
    const tags = useSelector(state => state.research.tags);   
    
    // DIALOG STATES 
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [dialogClassOpen, setDialogClassOpen] = useState(false);
    const [selectedCategoryClass, setSelectedCategoryClass] = useState(''); 
    const [selectedClass, setSelectedClass] = useState(''); 

    // HANDLE CLEAN TYPES
    const handleCleanTypes = () => {
        handleDialogOpen(false);
        handleDialogClassOpen(false);
        setSelectedClass('');
        setSelectedCategoryClass('');
    };

    // HANDLE TOGGLE DIALOG
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = (value) => {
        setDialogOpen(false);
    };    
    const handleDialogClassOpen = () => {
        setDialogClassOpen(true);
    };
    const handleDialogClassClose = (value) => {
        setDialogClassOpen(false);
    };    

    // HANDLE CLASS EDIT
    const handleClassEdit = (categoryid) => {
        setSelectedCategory(categoryid);
        handleDialogOpen(true);
    };
    // HANDLE TAG EDIT
    const handleTagEdit = (classid) => {
        const categoryClassId = classes.find(c => c.id === classid).category_id;
        setSelectedCategoryClass(categoryClassId);
        setSelectedClass(classid);
        handleDialogClassOpen(true);
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
                                        {classes && classes.filter(cl => cl.category_id === c.id).map(cc => ( 
                                            <Grid item xs={4}> 
                                                <List >
                                                    <ListItem key={cc.id} disablePadding >
                                                        <ListItemButton role={undefined} onClick={() => handleTagEdit(cc.id)} >

                                                            <ListItemIcon>
                                                                <Avatar sx={{ bgcolor: `${c.color}`, width: 30, height: 30,  }} >
                                                                    <BookmarkIcon fontSize="inherit"/>
                                                                </Avatar>
                                                                
                                                            </ListItemIcon>
                                                            <ListItemText primary={cc.name}/>
                                                        </ListItemButton>
                                                    </ListItem>
                                                </List>
                                                <Divider />
                                                <List dense >
                                                    {tags && tags.filter(t => t.class_id === cc.id).map(ct => (
                                                        <ListItem key={ct.id}>
                                                            <ListItemButton role={undefined} onClick={() => handleTagEdit(cc.id)} dense>
                                                                <ListItemIcon>
                                                                    <Avatar sx={{ bgcolor: `${c.color}`, width: 27, height: 27,  }} >
                                                                        <LabelIcon fontSize="inherit" />
                                                                    </Avatar>
                                                                </ListItemIcon>
                                                                <ListItemText primary={ct.name} />
                                                            </ListItemButton>
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
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
                
            </Grid>

            {/* MANAGE CLASS DIALOG */}
            <DefaultDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                title={`Incluir classes em [${selectedCategory && categories.find(c => c.id === selectedCategory).name}]`}
                children={<ClassesEdit categoryId={selectedCategory} />}
            />

            {/* MANAGE TAG DIALOG */}
            <DefaultDialog
                open={dialogClassOpen}
                onClose={handleDialogClassClose}
                title={`Organizar classe [${selectedClass && classes.find(c => c.id === selectedClass).name}] em [${selectedCategoryClass && categories.find(c => c.id === selectedCategoryClass).name}]`}
                children={<TagsEdit classId={selectedClass} cleanTypes={handleCleanTypes} />}
            />

            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
};

export default CategoriesMain;
