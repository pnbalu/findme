import React from 'react';
import { StyleSheet, Switch, Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import Colors from '../helpers/ColorHelper';

const ReminderItem = ({ reminder, setChangeState, index }) => {
  return (
    <ListItem
      bottomDivider={true}
      containerStyle={index % 2 === 0 ? styles.evenRow : styles.oddRow}
    >
      <ListItem.Content>
        <ListItem.Title>{reminder.reminder}</ListItem.Title>
      </ListItem.Content>
      <Switch
        tintColor="transparent"
        thumbTintColor={
          reminder.answer === 'Yes' ? Colors.switchOn : Colors.switchOff
        }
        onTintColor="transparent"
        value={reminder.answer === 'Yes'}
        style={{
          transform: [
            { scaleX: Platform.OS === 'ios' ? 1.0 : 1.3 },
            { scaleY: Platform.OS === 'ios' ? 1.0 : 1.3 },
          ],
        }}
        onValueChange={value => setChangeState(reminder.id, value)}
      />
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

export default ReminderItem;
