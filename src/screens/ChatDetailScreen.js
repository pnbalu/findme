import React, { useCallback, useContext, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { USER_DETAIL } from '../helpers/ConstantHelper';
import { Context as ChatContext } from '../contexts/ChatContext';
import Loader from '../components/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import useAsyncStorage from '../hooks/useAsyncStorage';
import MessageBubble from '../components/MessageBubble';
import ConfirmOverlay from '../components/ConfirmOverlay';
import LoaderOverlay from '../components/LoaderOverlay';
import api from '../helpers/AxiosHelper';
import { successToast } from '../helpers/ToastHelper';
import MessageInput from '../components/MessageInput';
import { generateMessages } from '../helpers/TransformHelper';
import MessageDate from '../components/MessageDate';
import Colors from '../helpers/ColorHelper';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';
import useDocumentPicker from '../hooks/useDocumentPicker';

const ChatDetailScreen = ({ navigation, route }) => {
  const [document, setDocument, pickDocument] = useDocumentPicker();

  const { chat } = route.params;

  const flatListRef = useRef();
  const [userDetail, loading] = useAsyncStorage(USER_DETAIL);
  const { state, getChatDetail, addChatMessage } = useContext(ChatContext);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [height, setHeight] = useState(60);
  const [message, setMessage] = useState('');

  const handleClose = () => setConfirmVisible(true);

  const handleConfirmOverlayYes = async () => {
    setConfirmVisible(false);
    setLoaderVisible(true);
    await api.put(`/external/my-chats/${chat.chatId}/close`);
    setLoaderVisible(false);
    successToast('Chat closed successfully.');
    navigation.goBack();
  };

  const handleConfirmOverlayNo = () => setConfirmVisible(false);

  const handleOnPress = () => {
    setMessage('');
    setHeight(30);
    setDocument(null);
    addChatMessage(state.chatDetails, chat.chatId, message, document);
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const setHeaderOptions = () => {
    navigation.setOptions({
      title: chat.chatSubject ?? 'Chat Detail',
      headerRight: () => {
        return (
          <>
            {chat.chatStatus === 'I' ? (
              <TouchableOpacity onPress={handleClose}>
                <AntDesign
                  name="closecircle"
                  color={Colors.themePrimaryColor}
                  size={28}
                  style={styles.headerOptions}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </>
        );
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      setHeaderOptions();
      if (userDetail) {
        getChatDetail(chat.chatId, userDetail.name);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat, userDetail])
  );

  return (
    <KeyboardAwareContainer>
      <SafeAreaView style={styles.outerContainer}>
        {state.fetching || loading ? (
          <Loader />
        ) : (
          <View style={styles.innerContainer}>
            <FlatList
              inverted={true}
              ref={flatListRef}
              data={generateMessages(state.chatDetails)}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return item.type === 'day' ? (
                  <MessageDate date={item.date} />
                ) : (
                  <MessageBubble message={item} />
                );
              }}
            />
            {(chat.chatStatus === 'N' || chat.chatStatus === 'I') && (
              <View style={styles.messageContainer}>
                <MessageInput
                  height={height}
                  setHeight={setHeight}
                  message={message}
                  setMessage={setMessage}
                  handleOnPress={handleOnPress}
                  handleDocumentPick={pickDocument}
                />
                <ConfirmOverlay
                  visible={confirmVisible}
                  message="Do you wish to close this chat?"
                  handleYes={handleConfirmOverlayYes}
                  handleNo={handleConfirmOverlayNo}
                />
                <LoaderOverlay
                  visible={loaderVisible}
                  message="Closing this chat"
                />
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAwareContainer>
  );
};

const styles = StyleSheet.create({
  headerOptions: {
    paddingRight: 20,
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  messageContainer: {
    justifyContent: 'flex-end',
  },
});

export default ChatDetailScreen;
