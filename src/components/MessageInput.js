import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, Entypo, Fontisto } from '@expo/vector-icons';
import { MAX_TEXT_INPUT_HEIGHT } from '../helpers/ConstantHelper';
import Colors from '../helpers/ColorHelper';

const MessageInput = ({
  message,
  setMessage,
  handleOnPress,
  handleDocumentPick,
  height,
  setHeight,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput
          placeholder={'Your Response'}
          style={[
            styles.textInput,
            {
              height: Math.min(MAX_TEXT_INPUT_HEIGHT, Math.max(35, height)),
            },
          ]}
          multiline={true}
          scrollEnabled={true}
          value={message}
          onChangeText={setMessage}
          onContentSizeChange={event =>
            setHeight(event.nativeEvent.contentSize.height)
          }
        />
        <TouchableOpacity onPress={handleDocumentPick}>
          <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {message ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleOnPress}>
            <MaterialIcons name="send" size={28} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
    paddingBottom: 5,
  },
  buttonContainer: {
    backgroundColor: Colors.themePrimaryColor,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageInput;
