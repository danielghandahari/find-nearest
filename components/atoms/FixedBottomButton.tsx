import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Text from './Text';

interface IProps {
  onPress: () => void;
  text: string;
}

const FixedBottomButton = ({onPress, text}: IProps) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FixedBottomButton;
