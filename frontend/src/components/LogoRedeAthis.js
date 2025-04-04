import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material';
import { publicTheme } from '../styles/publicStyles';

// STYLES 
import '../App.css';
const LogoRedeAthis = (props) => {
    const { width, onLogoRedeAthisClick } = props;

    return (
        <ThemeProvider theme={publicTheme} >
            <Box 
                component={Link} 
                onClick={onLogoRedeAthisClick}
                to="/" 
                sx={{ 
                    textDecoration: 'none', 
                    color: 'text.primary', 
                }} 
            >
                <svg 
                    id="logo_rede_athis" 
                    xmlns="http://www.w3.org/2000/svg" 
                    version="1.1" 
                    viewBox="0 0 213 79"
                    width={width}
                    height="100%"            
                >
                    <path className="ra-hv-svg-yellow" d="M87.86,35.34c.08.34.03.62-.16.85-.19.23-.45.35-.79.35h-5.3c-.46,0-.76-.23-.88-.69l-2.33-7.44c-.13-.42-.44-.63-.95-.63h-7c-.5,0-.82.21-.95.63l-2.27,7.44c-.13.46-.44.69-.95.69h-5.3c-.34,0-.6-.12-.79-.35-.19-.23-.24-.51-.16-.85L69.7,1.23c.17-.46.48-.69.95-.69h6.68c.46,0,.78.23.95.69l9.58,34.11ZM71.97,20.4c-.08.34-.03.63.16.88.19.25.45.38.79.38h2.14c.34,0,.59-.13.76-.38.17-.25.21-.55.13-.88l-1.07-3.47c-.13-.46-.43-.69-.91-.69s-.79.23-.91.69l-1.07,3.47Z"/>
                    <path className="ra-hv-svg-orange" d="M121.81,13.88v4.1c0,.67-.34,1.01-1.01,1.01h-5.23c-.25,0-.47.08-.66.25-.19.17-.28.4-.28.69v27.99c0,.29-.11.54-.32.72-.21.19-.44.28-.69.28h-5.93c-.25,0-.47-.09-.66-.28-.19-.19-.28-.43-.28-.72v-27.99c0-.29-.11-.53-.32-.69-.21-.17-.44-.25-.69-.25h-5.23c-.67,0-1.01-.34-1.01-1.01v-4.1c0-.63.34-.95,1.01-.95h20.3c.67,0,1.01.32,1.01.95Z"/>
                    <path className="ra-hv-svg-pink" d="M145.82,42.78h5.86c.67,0,1.01.32,1.01.95v34.05c0,.67-.34,1.01-1.01,1.01h-5.86c-.67,0-1.01-.34-1.01-1.01v-12.92c0-.25-.09-.47-.28-.66-.19-.19-.43-.28-.73-.28h-8.07c-.25,0-.47.09-.66.28-.19.19-.28.41-.28.66v12.92c0,.67-.34,1.01-1.01,1.01h-5.93c-.25,0-.47-.09-.66-.28-.19-.19-.28-.43-.28-.72v-34.05c0-.29.09-.53.28-.69.19-.17.41-.25.66-.25h5.93c.67,0,1.01.32,1.01.95v13.11c0,.29.09.54.28.73.19.19.41.28.66.28h8.07c.67,0,1.01-.34,1.01-1.01v-13.11c0-.63.34-.95,1.01-.95Z"/>
                    <path className="ra-hv-svg-blue" d="M166.28,53.73V19.69c0-.63.34-.95,1.01-.95h5.86c.67,0,1.01.32,1.01.95v34.05c0,.67-.34,1.01-1.01,1.01h-5.86c-.67,0-1.01-.34-1.01-1.01Z"/>
                    <path className="ra-hv-svg-green" d="M195.91,40.69c0,1.09.41,1.97,1.23,2.62.82.65,1.84,1.23,3.06,1.73,1.22.5,2.53,1.01,3.94,1.51,1.41.5,2.72,1.16,3.94,1.95,1.22.8,2.24,1.81,3.06,3.03.82,1.22,1.23,2.77,1.23,4.67-.04,1.89-.41,3.54-1.1,4.95-.69,1.41-1.61,2.58-2.74,3.5-1.13.92-2.43,1.61-3.88,2.05-1.45.44-2.95.66-4.51.66-3.03,0-5.61-.78-7.76-2.33-2.14-1.55-3.66-3.66-4.54-6.3-.21-.59-.02-.99.57-1.2l3.85-1.51c.25-.08.5-.06.76.06s.42.29.5.5c.46,1.47,1.13,2.62,2.02,3.44.88.82,2.12,1.25,3.72,1.29.88,0,1.65-.13,2.3-.38.65-.25,1.2-.59,1.64-1.01.44-.42.77-.87.98-1.36.21-.48.32-.98.32-1.48,0-1.09-.41-1.95-1.23-2.58-.82-.63-1.84-1.2-3.06-1.7-1.22-.5-2.53-1.01-3.94-1.51-1.41-.5-2.72-1.15-3.94-1.92-1.22-.78-2.24-1.78-3.06-3-.82-1.22-1.23-2.79-1.23-4.73.04-1.89.41-3.54,1.1-4.95.69-1.41,1.6-2.57,2.71-3.5,1.11-.92,2.4-1.62,3.85-2.08,1.45-.46,2.95-.69,4.51-.69,3.03,0,5.62.77,7.79,2.3,2.16,1.54,3.69,3.62,4.57,6.27.08.25.06.49-.06.73s-.29.39-.5.47l-3.85,1.51c-.25.08-.5.07-.76-.03-.25-.1-.42-.28-.5-.54-.5-1.47-1.2-2.61-2.08-3.4-.88-.8-2.12-1.2-3.72-1.2-.88,0-1.64.13-2.27.38-.63.25-1.17.58-1.61.98-.44.4-.77.85-.98,1.36-.21.5-.32.99-.32,1.45Z"/>
                    <g>
                        <path className="ra-svg-gray" d="M17.37,51.26c0,.8-.24,1.47-.73,2.03-.49.56-1.1.84-1.84.84-.65,0-1.22-.18-1.69-.56-.48-.37-.72-.89-.72-1.56,0-.33.08-.62.23-.89.15-.27.32-.56.5-.87,0-.16-.09-.24-.27-.24-.27,0-.64.35-1.1,1.04-.46.7-.94,1.59-1.45,2.67l-3.93,8.16H1.07l4.66-10.3c.09-.18.17-.39.24-.64.07-.24.11-.46.11-.66,0-.16-.03-.28-.08-.35s-.15-.11-.27-.11c-.22,0-.47.12-.76.35-.29.24-.57.52-.83.85-.26.33-.59.82-.99,1.45-.4.63-.71,1.18-.95,1.63l-.35-.13c1.14-2.19,2.12-3.6,2.96-4.24s1.76-.96,2.79-.96c.87,0,1.51.27,1.94.81.42.54.64,1.28.64,2.22,0,.36-.05.72-.14,1.08-.09.36-.17.63-.24.81l.08.03c.83-1.72,1.57-2.97,2.21-3.77.64-.8,1.55-1.19,2.73-1.19.85,0,1.49.26,1.91.79.42.52.64,1.09.64,1.71Z"/>
                        <path className="ra-svg-gray" d="M22.3,55.87c-.11.34-.21.79-.3,1.34-.09.55-.14,1.01-.14,1.37,0,1.01.14,1.72.42,2.14.28.42.69.62,1.24.62.42,0,.79-.05,1.11-.15.33-.1.71-.27,1.14-.53.43-.25.89-.62,1.37-1.11.48-.49.86-.96,1.15-1.43l.38.27c-.76,1.07-1.66,1.96-2.69,2.69s-2.28,1.09-3.75,1.09c-1.34,0-2.59-.4-3.76-1.21-1.17-.8-1.75-1.98-1.75-3.54,0-2.17.98-4.16,2.95-5.96,1.97-1.8,4.28-2.7,6.94-2.7,1.25,0,2.27.29,3.07.85.8.57,1.2,1.22,1.2,1.97,0,1.43-.83,2.5-2.5,3.21-1.67.71-3.7,1.07-6.09,1.07ZM22.38,55.54c1.27-.14,2.41-.85,3.44-2.12,1.03-1.27,1.55-2.39,1.55-3.36,0-.27-.04-.48-.11-.62-.07-.14-.24-.22-.49-.22-.4,0-.8.22-1.19.65-.4.43-.82,1.04-1.27,1.81-.45.77-.84,1.48-1.15,2.12s-.57,1.22-.77,1.74Z"/>
                        <path className="ra-svg-gray" d="M43.7,59.34c-.15.36-.25.64-.31.83-.06.19-.09.37-.09.53,0,.13.03.22.09.29s.16.09.29.09c.56,0,1.12-.36,1.67-1.08.55-.72.94-1.27,1.17-1.64.23-.37.52-.86.88-1.48l.35.16c-.6,1.1-1.13,1.98-1.59,2.63s-1.07,1.23-1.82,1.74c-.75.51-1.6.76-2.56.76-.83,0-1.52-.26-2.07-.77-.55-.51-.83-1.21-.83-2.07l.03-.35c-.71,1.07-1.4,1.87-2.07,2.4-.68.53-1.52.8-2.54.8-1.12,0-2.03-.38-2.71-1.14-.69-.76-1.03-1.8-1.03-3.12,0-2.08.86-4.12,2.59-6.13,1.73-2.01,3.68-3.01,5.87-3.01.89,0,1.58.16,2.07.49.5.33.75.84.75,1.55l-.03.41c.11-.29.46-1.17,1.04-2.66.59-1.48,1-2.53,1.23-3.13s.41-1.07.52-1.38c.11-.32.16-.56.16-.72,0-.34-.15-.56-.43-.64s-.93-.12-1.93-.12v-.43h8.27l-6.97,17.22ZM41.45,50.74c0-.29-.06-.51-.19-.65s-.32-.22-.57-.22c-.34,0-.71.24-1.1.71-.39.47-.92,1.37-1.59,2.7-.67,1.33-1.37,2.83-2.1,4.5-.73,1.67-1.1,2.74-1.1,3.21,0,.16.04.29.12.38.08.09.19.14.34.14.65,0,1.22-.26,1.71-.79.49-.52.87-.98,1.14-1.37.27-.39.57-.94.91-1.65.33-.71.82-1.9,1.46-3.57.64-1.66.96-2.79.96-3.39Z"/>
                        <path className="ra-svg-gray" d="M53.98,55.87c-.11.34-.21.79-.3,1.34-.09.55-.14,1.01-.14,1.37,0,1.01.14,1.72.42,2.14.28.42.69.62,1.24.62.42,0,.79-.05,1.11-.15.33-.1.71-.27,1.14-.53.44-.25.89-.62,1.37-1.11.48-.49.86-.96,1.15-1.43l.38.27c-.76,1.07-1.66,1.96-2.69,2.69s-2.28,1.09-3.75,1.09c-1.34,0-2.59-.4-3.76-1.21-1.17-.8-1.75-1.98-1.75-3.54,0-2.17.98-4.16,2.95-5.96,1.97-1.8,4.28-2.7,6.94-2.7,1.25,0,2.27.29,3.07.85s1.2,1.22,1.2,1.97c0,1.43-.83,2.5-2.5,3.21-1.67.71-3.7,1.07-6.09,1.07ZM54.06,55.54c1.27-.14,2.41-.85,3.44-2.12,1.03-1.27,1.55-2.39,1.55-3.36,0-.27-.04-.48-.11-.62-.07-.14-.23-.22-.49-.22-.4,0-.8.22-1.19.65-.4.43-.82,1.04-1.27,1.81-.45.77-.84,1.48-1.15,2.12s-.57,1.22-.77,1.74Z"/>
                    </g>
                </svg>
            </Box>
        </ThemeProvider>
    );
};

export default LogoRedeAthis;

LogoRedeAthis.defaultProps = {
    width: '100',
}

LogoRedeAthis.propTypes = {
    width: PropTypes.string.isRequired,
    onLogoRedeAthisClick:  PropTypes.func,
};