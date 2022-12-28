import PropTypes from 'prop-types';

const CasaAthis = (props) => {

    const { width, height, fill, stroke, strokeWidth, } = props;

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 34 34"
            width={width}
            height={height}
        >
            <polygon 
                points="30 32 30 15 17 2 4 15 4 32"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        </svg>
    )
};

export default CasaAthis;

CasaAthis.defaultProps = {
    width: '1rem',
    height: '1rem',
    fill: '#fff',
    stroke: '#fff',
    strokeWidth: 0

};

CasaAthis.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number
};