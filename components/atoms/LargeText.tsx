import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

import Text from './Text';

interface Props {
  children: string;
}

const LargeText: FC<Props> = ({children, ...props}) => (
  <Text style={styles.text} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
  },
});

export default LargeText;
