import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Container from '../components/Container';
import DoctorList from '../components/DoctorList';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';

const SpecialityScreen = ({ navigation, route }) => {
  const { speciality, doctors } = route.params;

  useFocusEffect(() => {
    navigation.setOptions({
      title: speciality,
    });
  });

  return (
    <Container>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <DoctorList doctors={doctors} isHorizontal={false} />
        </View>
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

export default SpecialityScreen;
