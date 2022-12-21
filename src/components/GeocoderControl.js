import React, { useState } from 'react';
import { useControl, Marker } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import PropTypes from 'prop-types';

const mapboxKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const GeocoderControl = (props) => {

    const { collapsed, position } = props;

    const [marker, setMarker] = useState(null);

    const geocoder = useControl(
        () => {
        const ctrl = new MapboxGeocoder({
            ...props,
            marker: false,
            accessToken: mapboxKey,
            collapsed: collapsed
        });
        ctrl.on('loading', props.onLoading);
        ctrl.on('results', props.onResults);
        ctrl.on('result', evt => {
            props.onResult(evt);

            const {result} = evt;
            const location =
            result &&
            (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
            if (location && props.marker) {
            setMarker(<Marker {...props.marker} longitude={location[0]} latitude={location[1]} />);
            } else {
            setMarker(null);
            }
        });
        ctrl.on('error', props.onError);
        return ctrl;
        },
        {
            position: position
        }
    );


    if (geocoder._map) {
        if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
        geocoder.setProximity(props.proximity);
        }
        if (geocoder.getRenderFunction() !== props.render && props.render !== undefined) {
        geocoder.setRenderFunction(props.render);
        }
        if (geocoder.getLanguage() !== props.language && props.language !== undefined) {
        geocoder.setLanguage(props.language);
        }
        if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
        geocoder.setZoom(props.zoom);
        }
        if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
        geocoder.setFlyTo(props.flyTo);
        }
        if (geocoder.getPlaceholder() !== props.placeholder && props.placeholder !== undefined) {
        geocoder.setPlaceholder(props.placeholder);
        }
        if (geocoder.getCountries() !== props.countries && props.countries !== undefined) {
        geocoder.setCountries(props.countries);
        }
        if (geocoder.getTypes() !== props.types && props.types !== undefined) {
        geocoder.setTypes(props.types);
        }
        if (geocoder.getMinLength() !== props.minLength && props.minLength !== undefined) {
        geocoder.setMinLength(props.minLength);
        }
        if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
        geocoder.setLimit(props.limit);
        }
        if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
        geocoder.setFilter(props.filter);
        }
        if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
        geocoder.setOrigin(props.origin);
        }
        // Types missing from @types/mapbox__mapbox-gl-geocoder
        // if (geocoder.getAutocomplete() !== props.autocomplete && props.autocomplete !== undefined) {
        //   geocoder.setAutocomplete(props.autocomplete);
        // }
        // if (geocoder.getFuzzyMatch() !== props.fuzzyMatch && props.fuzzyMatch !== undefined) {
        //   geocoder.setFuzzyMatch(props.fuzzyMatch);
        // }
        // if (geocoder.getRouting() !== props.routing && props.routing !== undefined) {
        //   geocoder.setRouting(props.routing);
        // }
        // if (geocoder.getWorldview() !== props.worldview && props.worldview !== undefined) {
        //   geocoder.setWorldview(props.worldview);
        // }
    }

    return marker;

};

export default GeocoderControl;

GeocoderControl.defaultProps = {
    marker: false,
    position: 'top-right',
    onLoading: () => {},
    onResults: () => {},
    onResult: () => {},
    onError: () => {}
};

GeocoderControl.propTypes = {
    marker: PropTypes.bool.isRequired,
    position: PropTypes.string,
    onLoading: PropTypes.object,
    onResults: PropTypes.object,
    onResult: PropTypes.object,
    onError: PropTypes.object
};

