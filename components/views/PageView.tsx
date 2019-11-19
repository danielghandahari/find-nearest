import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PageView: FC = ({children, ...props}) => {
  return (
    <View style={styles.container} {...props}>
      {children}
    </View>
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
