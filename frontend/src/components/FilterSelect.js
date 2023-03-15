import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { categoryLegendGrade } from '../features/researchSlice'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const FilterSelect = () => {

    // REDUX SELECTORS
    const categorieLegendGrade = useSelector(categoryLegendGrade); //console.log('categorieLegendGrade',categorieLegendGrade);
    //const categories = useSelector(state => state.research.categories);
    const classes = useSelector(state => state.research.classes);
    const tags = useSelector(state => state.research.tags);

    // AUTOCOMPLETE COMPONENTS
    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Box sx={{ m: 1.2, }}>
            {categorieLegendGrade && categorieLegendGrade.map(clg => {
                return (
                    clg.map(cat => {
                        const categoryTags = tags
                            .filter(tg => tg.class.category_id === cat.id)
                            .sort((a,b) => a.class_id - b.class_id);
                        return (
                            <Autocomplete
                                //onChange={(e) => console.log('Autocomplete',e)}
                                multiple
                                id={cat.id}
                                options={categoryTags}
                                limitTags={3}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                groupBy={(option) => classes.find(cl =>  cl.id === option.class_id).name}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props} >
                                        <Checkbox
                                            key={option.id}
                                            color={cat.style}
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            sx={{ mr: 0, ml: 0, my: 0, pl: 0, pr: 2, py: 0.5 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </li>
                                )}
                                ChipProps={{
                                    color: `${cat.style}`,
                                    size: 'small',
                                }}
                                style={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField {...params} label={cat.name} margin="dense" size="small" color={cat.style} />
                                )}
                            />
                        )
                    })
                )                
            })}

            {/* {categories && categories.map(cat => 
                {const categoryTags = tags
                    .filter(tg => tg.class.category_id === cat.id)
                    .sort((a,b) => a.class_id - b.class_id);
                    return (
                        <Autocomplete
                            //onChange={(e) => console.log('Autocomplete',e)}
                            multiple
                            id={cat.id}
                            options={categoryTags}
                            limitTags={3}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            groupBy={(option) => classes.find(cl =>  cl.id === option.class_id).name}
                            renderOption={(props, option, { selected }) => (
                                <li {...props} >
                                    <Checkbox
                                        key={option.id}
                                        color="pp"
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        sx={{ mr: 0, ml: 0, my: 0, pl: 0, pr: 2, py: 0.5 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            )}
                            ChipProps={{
                                color: 'ls',
                                size: 'small',
                            }}
                            style={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField {...params} label={cat.name} margin="dense" size="small" color="pp" />
                            )}
                        />
                    )
                })
            } */}
        </Box>
    );
};

export default FilterSelect;