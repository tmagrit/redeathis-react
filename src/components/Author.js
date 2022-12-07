import * as React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import ActionAuthorMenu from './ActionAuthorMenu';

const Author = (props) => {

    const { researchAuthor } = props;

    return (
        <Chip 
            clickable
            icon={<AccountCircleRoundedIcon />}
            deleteIcon={
                <ActionAuthorMenu 
                    section={'research'} 
                    //authorAction={authorAction} 
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
    //authorAction: PropTypes.func.isRequired,
};