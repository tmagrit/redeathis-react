import * as React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import ActionAuthorMenu from './ActionAuthorMenu';

const Author = (props) => {

    const { researchAuthor, authorAction } = props;

    return (
        <Chip 
            clickable
            icon={<AccountCircleRoundedIcon />}
            deleteIcon={
                <ActionAuthorMenu 
                    section={'research'} 
                    authorAction={authorAction} 
                    researchAuthor={researchAuthor} 
                    row={researchAuthor.author} 
                /> 
            }
            onDelete={() => {}}
            label={`${researchAuthor.author.name} ${researchAuthor.author.surname}`}
        />
    );
};

export default Author;

Author.defaultProps = {
    section: 'research',
}

Author.propTypes = {
    researchAuthor: PropTypes.object.isRequired,
    authorAction: PropTypes.func.isRequired,
};

        // <Card sx={{ width: '100%', mb: 1, }}>
        //     <CardHeader
        //         avatar={
        //             <Avatar variant="rounded" >
        //                 <AccountBoxIcon />
        //             </Avatar>
        //         }
        //         action={ 
        //             <ActionAuthorMenu 
        //                 section={'research'} 
        //                 authorAction={authorAction} 
        //                 researchAuthor={researchAuthor} 
        //                 row={researchAuthor.author} 
        //             /> 
        //         }
        //         title={`${researchAuthor.author.name} ${researchAuthor.author.surname}`}
        //         subheader="<research.date>"
        //     />
        // </Card>