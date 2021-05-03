import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../helpers/ColorHelper';

const ErrorText = ({ errorMessage }) => {
  return (
    <View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    color: Colors.errorTextColor,
    marginVertical: 15,
    textAlign: 'center',
  },
});

export default ErrorText;
