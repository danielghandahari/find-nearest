import React, {FC} from 'react';
import {Text as TextComponent, StyleSheet} from 'react-native';
import {textColor} from '../../utils/variables';

interface Props {
  children: string;
  style?: object;
}

const Text: FC<Props> = ({style, children, ...props}) => (
  <TextComponent style={{...styles.text, ...style}} {...props}>
    {children}
  </TextComponent>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Muli-Bold',
    fontSize: 18,
    color: textColor,
  },
});

export default Text;
