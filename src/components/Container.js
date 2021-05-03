import React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';

const Container = ({ children }) => (
  <ImageBackground
    style={styles.background}
    source={require('../../assets/background.png')}
  >
    {children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Container;
