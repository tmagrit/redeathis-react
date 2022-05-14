import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import ActionAuthorMenu from './ActionAuthorMenu';

const Author = (props) => {

    const { researchAuthor, authorAction } = props;

    return (
        <Card sx={{ width: '100%', mb: 1, }}>
            <CardHeader
                avatar={
                    <Avatar variant="rounded" >
                        <AccountBoxIcon />
                    </Avatar>
                }
                action={ 
                    <ActionAuthorMenu 
                        section={'research'} 
                        authorAction={authorAction} 
                        researchAuthor={researchAuthor} 
                        row={researchAuthor.author} 
                    /> 
                }
                title={`${researchAuthor.author.name} ${researchAuthor.author.surname}`}
                subheader="<research.date>"
            />
        </Card>
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