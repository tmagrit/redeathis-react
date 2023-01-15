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
                    backgroundColor: "#fff",
                    "&:hover": {
                        color: "#fff",
                        backgroundColor: `${categoryColor}`,
                        boxShadow: "none"
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





    // const BootstrapButton = styled(Button)({

    //     textTransform: "uppercase",
    //     fontWeight: 300,
    //     fontSize: 12,
    //     padding: "6px 9px",

    //     border: "1px solid",
    //     lineHeight: 0.9,
    //     backgroundColor: "#fff",
    //     color: "#0063cc",
    //     borderColor: "#0063cc",
    //     "&:hover": {
    //       backgroundColor: "#0063cc",
    //       borderColor: "#0063cc",
    //       color: "#fff",
    //       boxShadow: "none"
    //     },
    //     "&:active": {
    //       backgroundColor: "#0063cc",
    //       borderColor: "#0063cc",
    //       color: "#fff",
    //       boxShadow: "none"
    //     }
        // ,
        // "&:focus": {
        //   backgroundColor: "#0063cc",
        //   borderColor: "#0063cc",
        //   color: "#fff",
        //   boxShadow: "none"
        // }
    //   });





// {researchTags && researchClassesData.map(rcd => {
//     return (
//         <Box sx={{ mb: 1, }}>
//             <Typography variant="body2" component="h4" nowrap sx={{ fontWeight: 'bold', display: 'inline', mr: 1.5, }}>
//                 {`${rcd.name}:`} 
//             </Typography> 
//             {researchTagsData.filter(t => t.class_id === rcd.id).map(rtd => {
//                 return (
//                     <Chip label={rtd.name} variant="outlined" size="small" onClick={() => console.log('clicked')} sx={{ mr: 1, }} />
//                 )
//             })}
//         </Box>
//     )
// })}