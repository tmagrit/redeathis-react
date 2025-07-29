import * as React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import LayersIcon from '@mui/icons-material/Layers';
import ActionSourceMenu from './ActionSourceMenu';
import { truncate } from './truncate';

const Source = (props) => {

    const { source, color } = props; console.log('source',source);

    return (
        <Chip 
            clickable
            icon={<LayersIcon style={{ color: color }} />}
            deleteIcon={
                <ActionSourceMenu 
                    section={'research'} 
                    source={source} 
                    row={source.relatedResearch} 
                />
            }
            onDelete={() => {}}
            label={truncate(source.relatedResearch.title, 36)}
        />
    );
};

export default Source;

Source.defaultProps = {
    section: 'research',
}

Source.propTypes = {
    source: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
};
