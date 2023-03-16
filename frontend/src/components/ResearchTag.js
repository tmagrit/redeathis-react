import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import { ThemeProvider } from '@mui/material';
import { publicTheme } from '../styles/publicStyles';

const ResearchTag = (props) => {

    const { id } = props;

    const categories = useSelector(state => state.research.categories);
    const classes = useSelector(state => state.research.classes);
    const tags = useSelector(state => state.research.tags);
    const tag = tags.find(tg => tg.id === id) ?? null;
    const tagClass = classes.find(cl => cl.id === tag.class_id) ?? null;
    const classCategory = categories.find(ca => ca.id === tagClass.category_id) ?? null;

    return (
        <ThemeProvider theme={publicTheme} >
            <Chip  label={tag ? tag.name : ''} color={classCategory.style} size="small" />
        </ThemeProvider>  
    );

};

export default ResearchTag;

ResearchTag.propTypes = {
    id: PropTypes.number.isRequired
};