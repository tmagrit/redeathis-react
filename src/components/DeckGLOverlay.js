import { useControl } from 'react-map-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';

import PropTypes from 'prop-types';

const DeckGLOverlay = (props) => {

    const overlay = useControl(() => new MapboxOverlay(props));
    overlay.setProps(props);

    return null;
};

export default DeckGLOverlay;

DeckGLOverlay.defaultProps = {
    layers: []
};

DeckGLOverlay.propTypes = {
    layers: PropTypes.array.isRequired
};

