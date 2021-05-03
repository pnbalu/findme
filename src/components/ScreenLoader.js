import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import Container from './Container';
import Colors from '../helpers/ColorHelper';

const ScreenLoader = () => (
  <Container>
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.loaderColor} />
    </SafeAreaView>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenLoader;
