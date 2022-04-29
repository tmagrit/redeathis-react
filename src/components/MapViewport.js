import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { hexToRgb } from './colorConverter';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';


const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = "mapbox://styles/mapbox/dark-v10"

const MapViewport = (props) => {

    const { viewport, setViewport, style, color } = props;

    // DECK GL LAYER
    const layers = [
        new ScatterplotLayer({
            id: 'map-viewport-markers',
            data: [{ coordinates: [viewport.longitude,viewport.latitude] }],
            pickable: false,
            stroked: false,
            filled: true,
            radiusScale: 5,
            radiusMinPixels: 5,
            radiusMaxPixels: 10,
            getPosition: d => d.coordinates,
            getRadius: d => 5,
            getFillColor: d => hexToRgb(color)
        })
    ];    

    const handleChange = value => {
        setViewport(value);
    };

    return (
        <DeckGL initialViewState={viewport} layers={layers} onViewStateChange={handleChange} controller={true}>
            <Map reuseMaps style={style} mapStyle={mapboxStyle} mapboxAccessToken={mapboxKey} styleDiffing={true} />
        </DeckGL>
    );

};

export default MapViewport;

MapViewport.propTypes = {
    viewport: PropTypes.object.isRequired,
    setViewport: PropTypes.func,
    style: PropTypes.object.isRequired,
    color: PropTypes.array.isRequired,
};