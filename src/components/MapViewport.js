import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxKey = process.env.REACT_APP_MAPBOX_TOKEN

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