import React, {FC} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import Text from './atoms/Text';
import {shadow, grey, firstColor} from '../utils/variables';

interface Props {}

const SearchButton: FC<Props> = () => (
  <TouchableOpacity activeOpacity={1} style={styles.button}>
    <Text style={styles.text}>
      <Text style={styles.search}>s</Text>Place, adress ...
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    ...shadow,
    width: Dimensions.get('screen').width * 0.7,
    borderRadius: 15,
    padding: 15,
    backgroundColor: grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: firstColor,
  },
  search: {
    paddingRight: 100,
    color: firstColor,
  },
});

export default SearchButton;
