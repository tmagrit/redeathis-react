import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
//import NotchedOutline from '@mui/material/OutlinedInput/NotchedOutline';

const FormBox = (props) => {

    const { id, label, children, padding } = props;

    const [labelWidth, setLabelWidth] = useState(0);
    const labelRef = useRef(null);
    
    useEffect(() => {
        const labelNode = ReactDOM.findDOMNode(labelRef.current);
        setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
    }, [label]);

    return (
        <Box
            sx={{
                position: 'relative',
                my: 1,
                minHeight: 100,
                border: '1px solid',
                borderRadius: 1,
                borderColor: 'rgba(0, 0, 0, 0.26)',
                '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.54)',
                },
            }}
        >
            <InputLabel
                sx={{ 
                    zIndex: 1,
                    position: 'absolute',
                    left: '-5px',
                    top: 0,
                }}
                ref={labelRef}
                htmlFor={id}
                variant="outlined"
                shrink
            >
                <Box sx={{ bgcolor: 'background.paper', px: '5px', }} >{label}</Box>
            </InputLabel>

            <Box sx={{ position: 'relative',  }}>
                <Box id={id}  sx={{ ...padding, position: 'relative', }} >
                    {children}
                    {/* <NotchedOutline
                        notched
                        labelWidth={labelWidth}
                    /> */}
                </Box>
            </Box>
        </Box>
    );

};

export default FormBox;

FormBox.defaultProps = {
    styleContent: {  pl: '14px', pr: '24px', py: '8.5px', },
    label: 'Título',
}

FormBox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
    padding: PropTypes.object,
};