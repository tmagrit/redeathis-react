import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import { researchTagTheme } from '../styles/researchTagStyles';

const ResearchTag = (props) => {

    const { id } = props;

    const categories = useSelector(state => state.research.categories);
    const classes = useSelector(state => state.research.classes);
    const tags = useSelector(state => state.research.tags);
    const tag = tags.find(tg => tg.id === id) ?? null;
    const tagClass = classes.find(cl => cl.id === tag.class_id) ?? null;
    const classCategory = categories.find(ca => ca.id === tagClass.category_id) ?? null;

    const color = (classCategory) => {

        if(classCategory.id === 2 || classCategory.id === 7)
            return researchTagTheme.palette.tag.red;
        if(classCategory.id === 3 || classCategory.id === 5)
            return researchTagTheme.palette.tag.yellow; 
        if(classCategory.id === 4 || classCategory.id === 8)
            return researchTagTheme.palette.tag.green;             
        else
            return researchTagTheme.palette.tag.blue;              
    };

    return (
        <ThemeProvider theme={researchTagTheme} >
            <Button
                size="small"
                sx={{
                    minWidth: 40,
                    py: 0.1,
                    px: 0.5,
                    fontSize: 10,
                    fontWeight: 400,
                    border: "1px solid",
                    borderRadius: 0,
                    color: color(classCategory),
                    borderColor: color(classCategory),
                    "&:hover": {
                        color: "#fff",
                        borderColor: color(classCategory),
                        backgroundColor: color(classCategory),
                        boxShadow: "none",
                    },

                }}
            >
                {tag ? tag.name : ''}
            </Button>
        </ThemeProvider>  
    );


};

export default ResearchTag;

ResearchTag.propTypes = {
    id: PropTypes.number.isRequired
};