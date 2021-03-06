import React, {FC} from 'react';
import {Text as TextComponent, StyleSheet} from 'react-native';
import {textColor} from '../../utils/variables';

interface Props {
  children: string | Element;
  style?: object;
  numberOfLines?: number;
}

const Text: FC<Props> = ({style, children, numberOfLines}: Props) => (
  <TextComponent
    numberOfLines={numberOfLines}
    style={{...styles.text, ...style}}>
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
