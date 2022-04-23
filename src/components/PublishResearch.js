import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const PublishResearch = () => {

    // REDUX SELECTORS
    const categories = useSelector(state => state.research.categories);
    const statuses = useSelector(state => state.research.statuses);
    const section = useSelector(state => state.session.section);
    const context = useSelector(state => state.session.context);

    // CHANGE RESEARCH STATES
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState(statuses[1].status || '');
    const [geolocation, setGeolocation] = useState({});
    const [date, setDate] = useState({});

    // CHANGE RESEARCH STATES
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    return (

        <React.Fragment>
            <TextField
                id="status"
                select
                label="Status"
                size="small"
                value={status}
                onChange={handleChangeStatus}
                sx={{ my: 1,}}
                InputLabelProps={{ shrink: true }}
            >
                {statuses.map((c) => (
                    <MenuItem key={c.id} value={c.status}>
                        {c.status}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="category"
                select
                label="Categoria"
                size="small"
                value={category}
                onChange={handleChangeCategory}
                sx={{ my: 1,}}
                InputLabelProps={{ shrink: true }}
            >
                {categories.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                    {c.name}
                </MenuItem>
                ))}
            </TextField>
        </React.Fragment>
    )
};

export default PublishResearch;
