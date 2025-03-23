import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { selectSearchedResearch } from '../features/researchSlice'; 
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { truncate } from './truncate';

// STYLES
import { SearchResult } from '../styles/searchResultsStyles';

const SearchResults = () => {

    const searchedResearch = useSelector(selectSearchedResearch); 
    const categories = useSelector(state => state.research.categories); 
  

    return (
        <Stack >
            {searchedResearch.map(fr => {
                const category = categories.find(c => c.id === fr.category_id )
                return (
                    <SearchResult key={fr.id} component={Link} to={`/view/research/${fr.id}`} > 
                        <Stack sx={{ p: 1, }} >
                            <Typography variant="searchResultsTitle" component="div" sx={{ color: `${category.color}`, }} >{truncate(fr.title, 9)}</Typography>
                            <Stack direction="row" spacing={0.5} justifyContent="flex-start" alignItems="center" >
                                <Avatar sx={{ width: 7, height: 7, bgcolor: `${category.color}` }}> </Avatar>
                                <Typography variant="caption" component="div" >{category.name}</Typography>
                            </Stack>
                        </Stack>
                        <Divider />
                    </SearchResult>
                )
            })}
        </Stack>
    );

};

export default SearchResults;

