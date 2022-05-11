import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import LayersIcon from '@mui/icons-material/Layers';

import ActionMenu from './ActionMenu';


const Source = (props) => {

    const { research, color } = props;

    // ACTION MENU STATES
    const [anchorActionEl, setAnchorActionEl] = useState(null);
    const [open, setOpen] = useState(true);

    // HANDLE ACTION MENU
    const handleMenu = (event) => {
        setAnchorActionEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorActionEl(null);
    };

    return (
        <Card sx={{ width: '100%', mb: 1, }}>
            <CardHeader
                avatar={
                    <Avatar variant="rounded" sx={{ bgcolor: color }} >
                        <LayersIcon />
                    </Avatar>
                }
                action={ <ActionMenu section={'research'} mode='sources' row={research} /> }
                title={research.title}
                subheader="<research.date>"
            />
        </Card>
    );
};

export default Source;