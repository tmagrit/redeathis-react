import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTimeInterval } from '../features/researchSlice'; 
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'; 
import { isFullTimeInterval } from './isFullTimeInterval';

function valuetext(value) {
    return `Ano ${value}`;
};

const TimeSlider = () => {
        
    //REDUX SELECTORS
    const dispatch = useDispatch();
    const minYear = useSelector(state => state.research.researchMinYear); 
    const researchTimeInterval = useSelector(state => state.research.timeInterval); 

    const handleChange = (event, newValue) => {
        dispatch(updateTimeInterval(newValue));
    };
  
    return (
        <Box sx={{ width: '100%', px: 1.5, }}>
            <Slider
                color={isFullTimeInterval(researchTimeInterval, minYear) ? 'secondary' : 'primary'}
                size="small"
                marks={[
                    {
                        value: minYear,
                        label: `${minYear}`,
                    },
                    {
                        value: new Date().getFullYear(),
                        label: `${new Date().getFullYear()}`,
                    },
                ]}
                getAriaLabel={() => 'Intervalo de tempo'}
                valueLabelDisplay={isFullTimeInterval(researchTimeInterval, minYear) ? 'on' : 'auto'}
                value={researchTimeInterval}
                min={minYear}
                max={new Date().getFullYear()}
                step={1}
                onChange={handleChange}
                getAriaValueText={valuetext}
            />
        </Box>
    );
};

export default TimeSlider;