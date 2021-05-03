import { useFocusEffect } from '@react-navigation/native';
import React, { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Container from '../components/Container';
import Empty from '../components/Empty';
import ListHeader from '../components/ListHeader';
import QuestionnaireItem from '../components/QuestionnaireItem';
import ScreenLoader from '../components/ScreenLoader';
import { Context as DiseaseContext } from '../contexts/DiseaseContext';

const QuestionnaireScreen = ({ navigation, route }) => {
  const { disease } = route.params;

  const { state, setQuestionnaire, saveQuestionnaires } = useContext(
    DiseaseContext
  );

  useFocusEffect(() => {
    navigation.setOptions({
      title: disease?.name,
    });
  });

  if (state.fetching) {
    return <ScreenLoader />;
  }

  return (
    <Container>
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          {state.questionnaires.length > 0 && (
            <ListHeader header={`${state.questionnaires.length} Questions`} />
          )}
          <FlatList
            data={state.questionnaires}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <QuestionnaireItem
                questionnaire={item}
                index={index}
                handleValueChange={setQuestionnaire}
              />
            )}
            ListEmptyComponent={<Empty message="No questions available now." />}
          />
          {state.questionnaires.length ? (
            <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                loading={state.saving}
                onPress={() => saveQuestionnaires(state.questionnaires)}
              />
            </View>
          ) : null}
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
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
  },
});

export default QuestionnaireScreen;
