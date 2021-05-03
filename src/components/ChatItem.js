import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES } from '../helpers/CategoryHelper';
import ChatItemImage from './ChatItemImage';
import Colors from '../helpers/ColorHelper';

const ChatItem = ({ chat, setChatAsRead, index }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    if (chat.readStatus !== 'R') {
      setChatAsRead(chat.chatId);
    }
    navigation.navigate('ChatDetail', { chat });
  };

  const getCategoryImage = categoryLabel => {
    const category = CATEGORIES.find(item => item.label === categoryLabel);
    return category ? category.image : '';
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <ListItem
        bottomDivider={true}
        containerStyle={index % 2 === 0 ? styles.evenRow : styles.oddRow}
      >
        <ListItem.Content>
          <ListItem.Title style={[chat.readStatus !== 'R' && styles.bold]}>
            {chat.chatSubject}
          </ListItem.Title>
          <Text style={styles.time}>
            {moment(chat.chatCreatedTimestamp).fromNow()}
          </Text>
        </ListItem.Content>
        <ChatItemImage image={getCategoryImage(chat.chatCategory)} />
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  time: {
    fontSize: 12,
    color: Colors.chatTimeColor,
  },
  bold: {
    fontWeight: 'bold',
  },
  oddRow: {
    backgroundColor: Colors.rowOddColor,
  },
  evenRow: {
    backgroundColor: Colors.rowEvenColor,
  },
});

export default ChatItem;
