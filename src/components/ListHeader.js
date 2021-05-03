import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../helpers/ColorHelper';

const ListHeader = ({ header }) => (
  <View style={styles.container}>
    <Text style={styles.header}>{header}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 10,
    backgroundColor: Colors.headerBackgroundColor,
  },
  header: {
    color: Colors.textColor,
  },
});

export default ListHeader;
