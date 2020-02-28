import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';
import {grey} from '../utils/variables';

const LocationIcon = () => (
  <FontAwesomeIcon icon={faMapMarkedAlt} size={16} color={grey} />
);

export default LocationIcon;
