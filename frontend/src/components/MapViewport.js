import React from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';

import GeocoderControl from './GeocoderControl';
import DeckGLOverlay from './DeckGLOverlay';
import { hexToRgb } from './colorConverter';
import PropTypes from 'prop-types';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const MapViewport = (props) => {

    const { viewport, setViewport, style, color } = props;

    // DECK GL OVERLAY LAYER
    const scatterplotLayer = 
        new ScatterplotLayer({
            id: 'map-research-marker',
            data: [viewport],
            pickable: false,
            stroked: false,
            filled: true,
            radiusScale: 5,
            radiusMinPixels: 5,
            radiusMaxPixels: 10,
            getPosition: d => [d.longitude,d.latitude],
            getRadius: d => 5,
            getFillColor: d => hexToRgb(color)
        }
    );

    const handleChange = value => {
        setViewport(value);
    };

    return (
        <Map
            initialViewState={viewport}
            onMove={e => handleChange(e.viewState)}
            style={style}
            mapStyle={mapboxStyle}
            mapboxAccessToken={mapboxKey}
        >
            <NavigationControl position='bottom-right' /> 
            <DeckGLOverlay layers={[scatterplotLayer]}  />
            <GeocoderControl collapsed={true} position='top-right' />
        </Map>    
    );

};

export default MapViewport;

MapViewport.propTypes = {
    viewport: PropTypes.object.isRequired,
    setViewport: PropTypes.func,
    style: PropTypes.object.isRequired,
    color: PropTypes.array.isRequired,
};
