import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PageView: FC = ({children, ...props}) => {
  return (
    <LinearGradient
      colors={['#FF416C', '#FF4B2B']}
      style={styles.container}
      {...props}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 150,
  },
});

export default PageView;
