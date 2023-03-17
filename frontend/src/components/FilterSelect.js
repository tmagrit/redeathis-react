import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategoryLegendGrade, updateCategories, cleanFilters, updateCategoriesFilter } from '../features/researchSlice'; 
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const FilterSelect = () => {

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const categorieLegendGrade = useSelector(selectCategoryLegendGrade); 
    const categories = useSelector(state => state.research.categories);
    const cleanCategories = categories.map(c => {return {...c, filteredTags: []} }); 
    const classes = useSelector(state => state.research.classes);
    const tags = useSelector(state => state.research.tags);
    const categoriesFilter = useSelector(state => state.research.categoriesFilter);

    // AUTOCOMPLETE COMPONENTS
    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const handleFilterTagChange = (event, value, cat) => {
        const newCategories = categories.map(ft => {
            if(ft.id !== cat.id) 
                return ft;
            else {
                const newCat = {
                    ...ft, 
                    filteredTags: value
                }
                return newCat;   
            } 
        });

        dispatch(updateCategories(newCategories));
    };

    const handleFilterCategoriesChange = (event, value) => {
        dispatch(updateCategoriesFilter([...value]));
        if(value.length) {
            const updatedFilterCategories = value.map(v => {
                const allCategoryTags = tags.filter(t => t.class.category_id === v.id);
                return {...v, filteredTags: allCategoryTags}
            });

            const newCategories = categories.map(c => {
                if(updatedFilterCategories.find(ufc => ufc.id === c.id)) {
                    const newCat = updatedFilterCategories.find(ufc => ufc.id === c.id);
                    return newCat;
                } else 
                    return {...c, filteredTags: []};   
            });
            //console.log('newCategories',newCategories);
            dispatch(updateCategories(newCategories)); 

        } else {
            dispatch(cleanFilters());
        }
    };

    return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    height: '100%',
                    flexDirection: 'column', 
                    alignItems: 'stretch', 
                    justifyContent: 'space-between', 
                    alignContent: 'space-between', 
                }} 
            >
                <Box >
                    <Box sx={{ m: 1.2, }}> 
                        <Autocomplete
                            multiple
                            id="categories"
                            value={categoriesFilter}
                            onChange={(event, newValue) => {
                                handleFilterCategoriesChange(event, newValue) 
                            }}
                            options={cleanCategories}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderOption={(props, option, { selected }) => (
                                <li {...props} >
                                    <Checkbox
                                        key={option.id}
                                        color={option.style}
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        sx={{ mr: 0, ml: 0, my: 0, pl: 0, pr: 2, py: 0.5 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            )}
                            renderTags={(value, getTagProps) => 
                                value.map((option, index) => (
                                    <Chip
                                        size="small"
                                        label={option.name}
                                        color={option.style}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            style={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField {...params} label="Categorias" margin="dense" size="small" />
                            )}
                        />
                    </Box>

                    <Divider />

                    <Box sx={{ m: 1.2, }}> 
                        {categorieLegendGrade && categorieLegendGrade.map(clg => {
                            return (
                                clg.map(cat => {
                                    const categoryTags = tags
                                        .filter(tg => tg.class.category_id === cat.id)
                                        .sort((a,b) => a.class_id - b.class_id);
                                    return (
                                        <Autocomplete
                                            value={categories.find(c => c.name === cat.name).filteredTags}
                                            onChange={(event, newValue) => {
                                                handleFilterTagChange(event, newValue, cat) 
                                            }}
                                            multiple
                                            id={cat.name}
                                            key={`${cat.id}`}
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
                    </Box>
                </Box>
                
                <Box sx={{ m: 1.2, }}>
                    <Button fullWidth variant="outlined" onClick={() => dispatch(cleanFilters())}>
                        Limpar Filtros
                    </Button>
                </Box>

            </Box>
    );
};

export default FilterSelect;