import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image style={styles.icon} source={require('../../assets/logo.png')} />
);

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
    width: 35,
    height: 35,
  },
});

export default Logo;
