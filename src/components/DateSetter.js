import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const DateSetter = (props) => {

    const { context, interval, start, end } = props

    return(
        <FormControlLabel  control={<Switch checked={interval} />} label="Intervalo" />
    );
};

export default DateSetter;
