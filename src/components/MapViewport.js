import React, { useRef } from 'react';
import Map, { Marker, useControl } from 'react-map-gl';
//import DeckGL from '@deck.gl/react';
//import { ScatterplotLayer } from '@deck.gl/layers';
//import { hexToRgb } from './colorConverter';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';


const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const mapboxStyle = process.env.REACT_APP_MAPBOX_STYLE

const MapViewport = (props) => {

    const { viewport, setViewport, style, color } = props;
    
    // GEOCODER CONTROL COMPONENT
    function GeocoderControl () {
        const ctrl = new MapBoxGeocoder ({
            accessToken: mapboxKey,
            mapboxgl: mapboxgl,
            marker: true,
            collapsed: true,
        });
        useControl(() => ctrl);
      
        return null;
    };

    const handleChange = value => {
        setViewport(value);
    };

    return (
        <Map
            {...viewport}
            style={style}
            mapStyle={mapboxStyle}
            mapboxAccessToken={mapboxKey}
            onMove={e => handleChange(e.viewState)}
        >
            <GeocoderControl />
            <Marker longitude={viewport.longitude} latitude={viewport.latitude} anchor="bottom" color={color} />
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