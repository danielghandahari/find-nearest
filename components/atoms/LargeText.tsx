import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

import Text from './Text';
import {textColor} from '../../utils/variables';

interface IProps {
  children: string;
  style?: object;
}

const LargeText: FC<IProps> = ({children, style}: IProps) => (
  <Text style={{...styles.text, ...style}}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: textColor,
    fontWeight: '800',
  },
});

export default LargeText;
