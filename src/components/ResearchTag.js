import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const ResearchTag = (props) => {

    const { id } = props;

    const categories = useSelector(state => state.research.categories);
    const classes = useSelector(state => state.research.classes);
    const tags = useSelector(state => state.research.tags);
    const tag = tags.find(tg => tg.id === id) ?? null;
    const tagClass = classes.find(cl => cl.id === tag.class_id) ?? null;
    const classCategory = categories.find(ca => ca.id === tagClass.category_id) ?? null;
    const categoryColor = classCategory.color;

    if(classCategory) {
        return (
            <Button
                size="small"
                sx={{
                    minWidth: 40,
                    py: 0.1,
                    px: 0.5,
                    color: `${categoryColor}`,
                    fontSize: 10,
                    fontWeight: 400,
                    borderColor: `${categoryColor}`,
                    border: "1px solid",
                    borderRadius: 0,
                    //backgroundColor: "#fff",
                    "&:hover": {
                        color: "#fff",
                        backgroundColor: `${categoryColor}`,
                        boxShadow: "none",
                    },

                }}
            >
                {tag ? tag.name : ''}
            </Button>
        );
    } else {
        return null;
    };

};

export default ResearchTag;

ResearchTag.propTypes = {
    id: PropTypes.number.isRequired
};