import PropTypes from 'prop-types';

const CasaAthis = (props) => {

    const { scale, fill, stroke, strokeWidth, } = props;

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 30 30"
            width={scale}
            height={scale}
        >
            <polygon 
                points="28 30 28 13 15 0 2 13 2 30"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        </svg>
    )
};

export default CasaAthis;

CasaAthis.defaultProps = {
    scale: '1rem',
    fill: '#000000DE',
    stroke: '#000000DE',
    strokeWidth: '0'

};

CasaAthis.propTypes = {
    scale: PropTypes.string,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.string
};