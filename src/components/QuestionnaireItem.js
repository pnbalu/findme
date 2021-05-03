import React from 'react';
import { StyleSheet, Switch, Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import Colors from '../helpers/ColorHelper';
import { getOptions, isPickerOption } from '../helpers/TransformHelper';
import CustomPicker from './CustomPicker';

const QuestionnaireItem = ({ questionnaire, handleValueChange, index }) => {
  return (
    <ListItem
      bottomDivider={true}
      containerStyle={index % 2 === 0 ? styles.evenRow : styles.oddRow}
    >
      <ListItem.Content>
        <ListItem.Title>{questionnaire.question}</ListItem.Title>
      </ListItem.Content>
      {isPickerOption(questionnaire.options) ? (
        <CustomPicker
          items={getOptions(questionnaire.options)}
          value={questionnaire.answer}
          setValue={value => handleValueChange(questionnaire.id, value)}
          placeholder={{ label: 'Select  ', value: '', color: 'gray' }}
        />
      ) : (
        <Switch
          tintColor="transparent"
          thumbTintColor={
            questionnaire.answer === 'Yes' ? Colors.switchOn : Colors.switchOff
          }
          onTintColor="transparent"
          value={questionnaire.answer === 'Yes'}
          style={{
            transform: [
              { scaleX: Platform.OS === 'ios' ? 1.0 : 1.3 },
              { scaleY: Platform.OS === 'ios' ? 1.0 : 1.3 },
            ],
          }}
          onValueChange={value =>
            handleValueChange(questionnaire.id, value ? 'Yes' : 'No')
          }
        />
      )}
    </ListItem>
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

export default QuestionnaireItem;
