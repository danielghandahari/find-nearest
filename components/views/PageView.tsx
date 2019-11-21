import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {firstColor, secondColor} from '../../utils/variables';

interface Props {
  style?: object;
}

const PageView: FC<Props> = ({style, children, ...props}) => {
  return (
    <LinearGradient
      colors={[firstColor, secondColor]}
      style={{...styles.container, ...style}}
      {...props}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingVertical: 150,
  },
});

export default PageView;
