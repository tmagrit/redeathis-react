import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ActionMenu from './ActionMenu';


const Source = (props) => {

    const { author } = props;

    return (
        <Card sx={{ width: '100%', mb: 1, }}>
            <CardHeader
                avatar={
                <Avatar  aria-label="recipe">
                    A
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon mode={'editsources'} onClick={undefined} />
                </IconButton>
                }
                title={author.name}
                subheader="birth - death"
            />
        </Card>
    );
};

export default Source;