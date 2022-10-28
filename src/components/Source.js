import * as React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import LayersIcon from '@mui/icons-material/Layers';

import ActionSourceMenu from './ActionSourceMenu';
import { truncate } from './truncate';

const Source = (props) => {

    const { source, color, sourceAction } = props;

    return (
        <Chip 
            clickable
            icon={<LayersIcon style={{ color: color }} />}
            deleteIcon={
                <ActionSourceMenu 
                    section={'research'} 
                    sourceAction={sourceAction} 
                    source={source} 
                    row={source.research_source} 
                />
            }
            onDelete={() => {}}
            label={truncate(source.research_source.title, 12)}
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
    sourceAction: PropTypes.func.isRequired,
};

// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import Avatar from '@mui/material/Avatar';

// <Card sx={{ width: '100%', mb: 1, }}>
//     <CardHeader
//         avatar={
//             <Avatar variant="rounded" sx={{ bgcolor: color }} >
//                 <LayersIcon />
//             </Avatar>
//         }
//         action={ 
//             <ActionSourceMenu 
//                 section={'research'} 
//                 sourceAction={sourceAction} 
//                 source={source} 
//                 row={source.research_source} 
//             /> 
//         }
//         title={source.research_source.title}
//         subheader="<research.date>"
//     />
// </Card>