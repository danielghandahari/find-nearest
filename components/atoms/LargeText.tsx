import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

import Text from './Text';
import {textColor} from '../../utils/variables';

interface IProps {
  children: string;
}

const LargeText: FC<IProps> = ({children}: IProps) => (
  <Text style={styles.text}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: textColor,
  },
});

export default LargeText;
