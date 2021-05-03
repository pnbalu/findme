import React from 'react';
import { SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import Container from '../components/Container';
import useDoctors from '../hooks/useDoctors';
import DoctorList from '../components/DoctorList';
import ScreenLoader from '../components/ScreenLoader';
import Empty from '../components/Empty';

const DoctorScreen = () => {
  const [doctors, fetching] = useDoctors();

  if (fetching) {
    return <ScreenLoader />;
  }

  return (
    <Container>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <FlatList
            data={doctors}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <DoctorList doctors={doctors} isHorizontal={false} />
            )}
            ListEmptyComponent={<Empty message="No doctors available now." />}
          />
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

export default DoctorScreen;
