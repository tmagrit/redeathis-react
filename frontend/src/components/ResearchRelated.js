import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { selectResearchRelations } from '../features/researchSlice'; 
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { categoryTitle } from '../components/categoryTitle';

// import { truncate } from './truncate';

// STYLES
import { RelatedResearch } from '../styles/searchResultsStyles';

const ResearchRelated = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const researchRelations = useSelector(selectResearchRelations); 
    const researchSources = researchRelations.find(rr => rr.id === parseInt(params.researchId, 10) );
    const categories = useSelector(state => state.research.categories); 
  
    return (
        <Stack >
            {researchSources.relations && researchSources.relations.map((rs, index) => {
                const category = categories.find(c => c.id === rs.category_id )
                return (
                    <RelatedResearch key={rs.id} component={Link} to={`/view/research/${rs.id}`} > 
                        {index === 0 && <Divider />}
                        <Stack >
                            <Typography variant="searchResultsTitle" component="div" sx={{ color: `${category.color}`, mt: 1, mb: 0.5, }} >{rs.title}</Typography>
                            <Stack direction="row" spacing={0.5} justifyContent="flex-start" alignItems="center" >
                                <Avatar sx={{ width: 7, height: 7, bgcolor: `${category.color}` }}> </Avatar>
                                <Typography 
                                    variant="caption" 
                                    component="div" 
                                >
                                    {categoryTitle(categories.find(c => c.id === rs.category_id).name)}
                                </Typography> 
                            </Stack>
                        </Stack>
                        <Divider sx={{ pt: 1, pb: 1, }}/>
                    </RelatedResearch>
                )
            })}
        </Stack>
    );

};

export default ResearchRelated;

