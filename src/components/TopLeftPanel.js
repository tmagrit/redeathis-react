import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';

const TopLeftPanel = () => {

    // REDUX SELECTORS
    const section = useSelector(state => state.session.section);
    const context = useSelector(state => state.session.context);

    // CREATE RESEARCH STATES
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [link, setLink] = useState('');
    const [notes, setNotes] = useState('');

    // CHANGE RESEARCH STATES
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleChangeSummary = (event) => {
        setSummary(event.target.value);
    };
    const handleChangeLink = (event) => {
        setLink(event.target.value);
    };
    const handleChangeNotes = (event) => {
        setNotes(event.target.value);
    };



    return (
        <React.Fragment>
            <TextField
                value={title}
                //error={emailError(email)}
                onChange={handleChangeTitle}
                fullWidth
                label="Título"
                id="title"
                size="small"
                multiline={true}
                minRows={1}
                maxRows={2}
                type="text"
                //helperText={emailError(email) ? "Digite um endereço de e-mail válido" : null}
                sx={{ my: 1,}}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                value={link}
                onChange={handleChangeLink}
                fullWidth
                label="Link"
                id="link"
                size="small"
                type="url"
                sx={{ my: 1,}}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment>,
                    }}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                value={notes}
                onChange={handleChangeNotes}
                fullWidth
                label="Notas"
                id="notes"
                size="small"
                multiline={true}
                minRows={5}
                maxRows={10}
                type="text"
                sx={{ my: 1,}}
                InputLabelProps={{ shrink: true }}
            />
        </React.Fragment>
    );
};

export default TopLeftPanel;