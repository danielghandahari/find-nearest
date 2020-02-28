/* eslint-disable react/jsx-props-no-spreading */
import React, {FC} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

interface IProps {
  elementType: 'view' | 'button';
  children: Element | Element[] | JSX.Element;
  style: object;

  // rest props
  activeOpacity?: number;
  onPress?: () => void;
}

const SkeumorphicView: FC<IProps> = ({
  elementType = 'view',
  children,
  style,
  ...props
}: IProps) => {
  let Element: any;
  if (elementType === 'view') Element = View;
  else if (elementType === 'button') Element = TouchableOpacity;

  return (
    <View style={styles.container}>
      <Element style={{...styles.innerContainer, ...style}} {...props}>
        {children}
      </Element>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#fafafa',
    shadowOffset: {
      width: -9,
      height: -9,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  innerContainer: {
    shadowColor: 'black',
    shadowOffset: {
      width: 9,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
});

export default SkeumorphicView;
