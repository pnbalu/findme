import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../helpers/ColorHelper';

const Empty = ({ message }) => {
  return (
    <View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textColor,
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
});

export default Empty;
