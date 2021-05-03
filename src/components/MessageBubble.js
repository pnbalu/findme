import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import { getFileName } from '../helpers/TransformHelper';

const MessageBubble = ({ message }) => {
  return (
    <View
      style={[styles.message, message.isMine ? styles.mine : styles.notMine]}
    >
      <View
        style={[
          styles.cloud,
          message.isMine ? styles.mineBackground : styles.notMineBackground,
        ]}
      >
        <View>
          {message.isMine ? (
            <View style={styles.authorContainer}>
              <Text style={[styles.messageName, styles.mineColor]}>You</Text>
              <Text style={[styles.messageTime, styles.mineColor]}>
                {moment(message.createdOn).format('hh:mm A')}
              </Text>
            </View>
          ) : (
            <View style={styles.authorContainer}>
              <Text style={[styles.messageName, styles.notMineColor]}>
                {message.createdBy}
              </Text>
              <Text style={[styles.messageTime, styles.notMineColor]}>
                {moment(message.createdOn).format('hh:mm A')}
              </Text>
            </View>
          )}
          <Text
            style={[
              styles.messageText,
              message.isMine ? styles.mineColor : styles.notMineColor,
            ]}
          >
            {message.detail}
          </Text>
          {message.filePath && (
            <Text
              style={[
                styles.documentText,
                message.isMine ? styles.mineColor : styles.notMineColor,
              ]}
            >
              {getFileName(message.filePath)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  mine: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  mineBackground: {
    backgroundColor: '#2196F3',
  },
  mineColor: {
    color: '#FFFFFF',
  },
  notMine: {
    marginLeft: 10,
  },
  notMineBackground: {
    backgroundColor: '#FFFFFF',
  },
  notMineColor: {
    color: '#000000',
  },
  cloud: {
    width: '80%',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    elevation: 8,
  },
  messageName: {
    paddingTop: 2,
    fontSize: 12,
  },
  messageText: {
    paddingTop: 3,
    fontSize: 17,
  },
  documentText: {
    marginTop: 15,
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
  },
  messageTime: {
    paddingTop: 2,
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
  },
});

export default MessageBubble;
