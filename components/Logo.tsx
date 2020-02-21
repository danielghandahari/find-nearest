import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

const Logo = () => (
  <Image
    source={require('../assets/images/metro-orange-logo.png')}
    style={styles.container}
  />
);

const logoRatio = 743.27 / 407;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.7,
    height: (Dimensions.get('screen').width * 0.7) / logoRatio,
  },
});

export default Logo;
