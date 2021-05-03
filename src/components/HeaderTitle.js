import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Colors from '../helpers/ColorHelper';

const HeaderTitle = ({ title }) => (
  <Text h4 style={styles.title}>
    {title}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.textColor,
  },
});

export default HeaderTitle;
