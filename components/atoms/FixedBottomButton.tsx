import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Text from './Text';
import {secondColor, thirdColor} from '../../utils/variables';

interface IProps {
  onPress: () => void;
  text: string;
}

const FixedBottomButton = ({onPress, text}: IProps) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: '100%',
    backgroundColor: secondColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: thirdColor,
    fontWeight: '900',
    fontSize: 25,
  },
});

export default FixedBottomButton;
