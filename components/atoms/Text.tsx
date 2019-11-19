import React, {FC} from 'react';
import {Text as TextComponent, StyleSheet} from 'react-native';

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
    fontSize: 32,
  },
});

export default Text;
