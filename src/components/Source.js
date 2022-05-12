import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import LayersIcon from '@mui/icons-material/Layers';

import ActionRelateMenu from './ActionRelateMenu';


const Source = (props) => {

    const { source, color } = props;

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
                action={ <ActionRelateMenu section={'research'} row={source.research_source} source={source} /> }
                title={source.research_source.title}
                subheader="<research.date>"
            />
        </Card>
    );
};

export default Source;