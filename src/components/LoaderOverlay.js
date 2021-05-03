import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

const LoaderOverlay = ({ visible, message }) => {
  return (
    <Overlay isVisible={visible}>
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
        <Button loading={true} />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
  },
});

export default LoaderOverlay;
