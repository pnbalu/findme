import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';

const MessageDate = ({ date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.day}>
        {moment(date).calendar({
          lastDay: '[Yesterday]',
          sameDay: '[Today]',
          lastWeek: 'LL',
          sameElse: 'LL',
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
  },
  day: {
    backgroundColor: '#0277BD',
    color: '#FFF',
    padding: 10,
    borderRadius: 10,
    textAlignVertical: 'center',
  },
});

export default MessageDate;
