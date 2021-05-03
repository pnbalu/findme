import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Colors from '../helpers/ColorHelper';

const DiseaseItem = ({ disease, index, fetchQuestionnaireList }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    fetchQuestionnaireList(disease.abbreviation);
    navigation.navigate('ChronicCondition', {
      screen: 'Questionnaire',
      params: { disease },
    });
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <ListItem
        bottomDivider={true}
        containerStyle={index % 2 === 0 ? styles.evenRow : styles.oddRow}
      >
        <ListItem.Content>
          <ListItem.Title>{disease.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={24} />
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  oddRow: {
    backgroundColor: Colors.rowOddColor,
  },
  evenRow: {
    backgroundColor: Colors.rowEvenColor,
  },
});

export default DiseaseItem;
