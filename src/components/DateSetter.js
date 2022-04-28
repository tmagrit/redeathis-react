import * as React from 'react';
import { useState } from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

const DateSetter = (props) => {

    const { context, setDate, date } = props
    const [dateValue, setDateValue] = useState({ ...date });
    
    const handleChange = value => {
        setDateValue(value);
        setDate(value);
      };

    return(
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Stack spacing={2}>
                <FormControlLabel  
                    control={
                        <Switch 
                            checked={dateValue.interval} 
                            onChange={event => handleChange({ ...dateValue, interval: Boolean(event.target.checked) })}
                        />
                    } 
                    label="Intervalo" 
                />
                <DesktopDatePicker
                    maxDate={dateValue.end}
                    label="Início"
                    inputFormat="dd/MM/yyyy"
                    value={dateValue.start}
                    onChange={value => handleChange({ ...dateValue, start:value })}
                    renderInput={(params) => <TextField size="small" {...params} />}
                />
                <DesktopDatePicker
                    minDate={dateValue.start}
                    label="Fim"
                    disabled={!dateValue.interval}
                    inputFormat="dd/MM/yyyy"
                    value={dateValue.end}
                    onChange={value => handleChange({ ...dateValue, end:value })}
                    renderInput={(params) => <TextField size="small" sx={{ display: !dateValue.interval ? 'none' : undefined }} {...params} />}
                    disableFuture
                />
            </Stack>
        </LocalizationProvider>
    );
};

export default DateSetter;
