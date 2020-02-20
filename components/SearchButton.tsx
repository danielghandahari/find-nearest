import React, {FC} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import Text from './atoms/Text';
import {shadow, grey, firstColor} from '../utils/variables';
import {trim} from '../utils/functions';

interface IProps {
  text: string;
  onPress: () => void;
}

const SearchButton: FC<IProps> = ({text, onPress}: IProps) => (
  <TouchableOpacity activeOpacity={1} style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{trim(text).formattedStr}</Text>
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
});

export default SearchButton;
