import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {firstColor, secondColor} from '../../utils/variables';

interface Props {
  style?: object;
  children: Element | Element[];
}

const PageView: FC<Props> = ({style, children}: Props) => {
  return (
    <LinearGradient
      // colors={[firstColor, secondColor]}
      colors={['black', 'black']}
      style={{...styles.container, ...style}}>
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
