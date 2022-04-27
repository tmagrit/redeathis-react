import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';


const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const MapViewport = ({ viewport, setViewport, style, children }) => {

    const handleChange = value => {
        setViewport(value);
    };

    return (
        <Map
            {...viewport}
            style={style}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={mapboxKey}
            onMove={handleChange}
        >
            {children}
        </Map>
    );

};

export default MapViewport;

MapViewport.propTypes = {
    viewport: PropTypes.object.isRequired,
    setViewport: PropTypes.func,
    style: PropTypes.object.isRequired,
    children: PropTypes.node,
};