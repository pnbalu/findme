import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Container from '../components/Container';

const TeleMedicineScreen = () => {
  return (
    <Container>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer} />
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
});

export default TeleMedicineScreen;
