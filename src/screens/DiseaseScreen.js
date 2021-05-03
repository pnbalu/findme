import React, { useCallback, useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import Container from '../components/Container';
import Empty from '../components/Empty';
import { Context as DiseaseContext } from '../contexts/DiseaseContext';
import DiseaseItem from '../components/DiseaseItem';
import { useFocusEffect } from '@react-navigation/native';
import ScreenLoader from '../components/ScreenLoader';
import ListHeader from '../components/ListHeader';

const DiseaseScreen = () => {
  const { state, fetchDiseaseList, fetchQuestionnaireList } = useContext(
    DiseaseContext
  );

  useFocusEffect(
    useCallback(() => {
      fetchDiseaseList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  if (state.fetching) {
    return <ScreenLoader />;
  }

  return (
    <Container>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          {state.diseases.length > 0 && (
            <ListHeader
              header={`${state.diseases.length} Chronic Conditions`}
            />
          )}
          <FlatList
            data={state.diseases}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.abbreviation}
            renderItem={({ item, index }) => (
              <DiseaseItem
                disease={item}
                index={index}
                fetchQuestionnaireList={fetchQuestionnaireList}
              />
            )}
            ListEmptyComponent={<Empty message="No diseases available now." />}
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

export default DiseaseScreen;
