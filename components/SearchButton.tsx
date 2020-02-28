import React, {FC} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, View} from 'react-native';

import Text from './atoms/Text';
import {grey, firstColor, thirdColor} from '../utils/variables';
import {trim} from '../utils/functions';
import SkeumorphicView from './views/SkeumorphicView';

interface IProps {
  text: string;
  onPress: () => void;
}

const SearchButton: FC<IProps> = ({text, onPress}: IProps) => (
  <SkeumorphicView
    activeOpacity={1}
    style={styles.button}
    onPress={onPress}
    elementType="button">
    {text === '' ? (
      <Text style={styles.placeholder} numberOfLines={1}>
        Place, address, location ...
      </Text>
    ) : (
      <Text numberOfLines={1} style={styles.text}>
        {trim(text).formattedStr}
      </Text>
    )}
  </SkeumorphicView>
);

const styles = StyleSheet.create({
  container: {
    shadowColor: '#fafafa',
    shadowOffset: {
      width: -9,
      height: -9,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  button: {
    shadowColor: 'black',
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,

    width: Dimensions.get('screen').width * 0.7,
    borderRadius: 15,
    padding: 15,
    backgroundColor: firstColor,
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 30,
  },
  placeholder: {
    color: grey,
  },
  text: {
    color: thirdColor,
  },
});

export default SearchButton;
