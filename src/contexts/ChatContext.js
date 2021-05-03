import createDataContext from './createDataContext';
import api from '../helpers/AxiosHelper';
import { goBack } from '../helpers/NavigationHelper';
import { successToast, errorToast } from '../helpers/ToastHelper';

const CHAT_LIST_REQUEST = 'CHAT_LIST_REQUEST';
const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS';
const CHAT_LIST_ERROR = 'CHAT_LIST_ERROR';

const NEW_CHAT_REQUEST = 'NEW_CHAT_REQUEST';
const NEW_CHAT_SUCCESS = 'NEW_CHAT_SUCCESS';
const NEW_CHAT_ERROR = 'NEW_CHAT_ERROR';

const CLOSE_CHAT_REQUEST = 'CLOSE_CHAT_REQUEST';
const CLOSE_CHAT_SUCCESS = 'CLOSE_CHAT_SUCCESS';
const CLOSE_CHAT_ERROR = 'CLOSE_CHAT_ERROR';

const CHAT_DETAIL_REQUEST = 'CHAT_DETAIL_REQUEST';
const CHAT_DETAIL_SUCCESS = 'CHAT_DETAIL_SUCCESS';
const CHAT_DETAIL_ERROR = 'CHAT_DETAIL_ERROR';

const ADD_CHAT_MESSAGE_REQUEST = 'ADD_CHAT_MESSAGE_REQUEST';
const ADD_CHAT_MESSAGE_SUCCESS = 'ADD_CHAT_MESSAGE_SUCCESS';

const CLEAR_ERROR = 'CLEAR_ERROR';

const chatReducer = (state, action) => {
  switch (action.type) {
    // Chat list
    case CHAT_LIST_REQUEST:
      return { ...state, fetching: true, chats: [], error: '' };
    case CHAT_LIST_SUCCESS:
      return { ...state, fetching: false, chats: action.payload, error: '' };
    case CHAT_LIST_ERROR:
      return { ...state, fetching: false, chats: [], error: action.payload };

    // New Chat
    case NEW_CHAT_REQUEST:
      return { ...state, saving: true, error: '' };
    case NEW_CHAT_SUCCESS:
      return { ...state, saving: false, error: '' };
    case NEW_CHAT_ERROR:
      return { ...state, saving: false, error: action.payload };

    // Close Chat
    case CLOSE_CHAT_REQUEST:
      return { ...state, fetching: true, error: '' };
    case CLOSE_CHAT_SUCCESS:
      return { ...state, fetching: false, error: '' };
    case CLOSE_CHAT_ERROR:
      return { ...state, fetching: false, error: action.payload };

    // Chat detail
    case CHAT_DETAIL_REQUEST:
      return { ...state, fetching: true, chatDetails: [], error: '' };
    case CHAT_DETAIL_SUCCESS:
      return {
        ...state,
        fetching: false,
        chatDetails: action.payload ?? [],
        error: '',
      };
    case CHAT_DETAIL_ERROR:
      return {
        ...state,
        fetching: false,
        chatDetails: [],
        error: action.payload,
      };

    // Add chat message
    case ADD_CHAT_MESSAGE_REQUEST:
      return { ...state, saving: true, error: '' };
    case ADD_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        chatDetails: action.payload,
        saving: false,
        error: '',
      };

    // Clear error
    case CLEAR_ERROR:
      return { ...state, fetching: false, error: '' };
    default:
      return state;
  }
};

const transformChatDetails = (chatDetails, name) => {
  return chatDetails.map(detail =>
    detail.createdBy === name
      ? { ...detail, isMine: true }
      : { ...detail, isMine: false }
  );
};

const clearError = dispatch => () => {
  dispatch({ type: CLEAR_ERROR });
};

const fetchChatList = dispatch => async () => {
  try {
    dispatch({ type: CHAT_LIST_REQUEST });
    const response = await api.get('/external/my-chats');
    dispatch({ type: CHAT_LIST_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({
      type: CHAT_LIST_ERROR,
      payload: 'Error fetching chat list. Try after sometime.',
    });
  }
};

const newChat = dispatch => async ({ category, subject, message, file }) => {
  try {
    console.log('file', file);
    dispatch({ type: NEW_CHAT_REQUEST });
    const formData = new FormData();
    formData.append('category', category);
    formData.append('subject', subject);
    formData.append('message', message);
    if (file) {
      const { name, uri } = file;
      const uriParts = name.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('file', {
        uri,
        name,
        type: `application/${fileType}`,
      });
    }
    await api.post('/external/my-chats', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: NEW_CHAT_SUCCESS });
    successToast('Chat message added successfully.');
    goBack();
  } catch (err) {
    console.log(err);
    dispatch({
      type: NEW_CHAT_ERROR,
      payload: 'Error creating a chat. Try after sometime.',
    });
  }
};

const closeChat = dispatch => async chatId => {
  try {
    dispatch({ type: CLOSE_CHAT_REQUEST });
    const response = await api.get(`/external/my-chats/${chatId}/close`);
    dispatch({ type: CLOSE_CHAT_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({
      type: CLOSE_CHAT_ERROR,
      payload: 'Error closing this chat. Try after sometime.',
    });
  }
};

const getChatDetail = dispatch => async (chatId, name) => {
  try {
    dispatch({ type: CHAT_DETAIL_REQUEST });
    const response = await api.get(`/external/my-chat-details/${chatId}`);
    dispatch({
      type: CHAT_DETAIL_SUCCESS,
      payload: transformChatDetails(response.data.chatDetails, name),
    });
  } catch (err) {
    dispatch({
      type: CHAT_DETAIL_ERROR,
      payload: 'Error getting chat details. Try after sometime.',
    });
  }
};

const addChatMessage = dispatch => async (
  chatDetails,
  chatId,
  message,
  file
) => {
  try {
    dispatch({ type: ADD_CHAT_MESSAGE_REQUEST });
    const formData = new FormData();
    formData.append('message', message);
    if (file) {
      const { name, uri } = file;
      const uriParts = name.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('file', {
        uri,
        name,
        type: `application/${fileType}`,
      });
    }
    const response = await api.post(
      `/external/my-chat-details/${chatId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const newChatDetail = response.data;
    const newChatMessage = {
      id: newChatDetail.id,
      detail: newChatDetail.detail,
      filePath: newChatDetail.filePath,
      createdOn: newChatDetail.createdOn,
      createdBy: newChatDetail.createdBy,
      isMine: true,
    };
    dispatch({
      type: ADD_CHAT_MESSAGE_SUCCESS,
      payload: [newChatMessage, ...chatDetails],
    });
  } catch (err) {
    errorToast('Error saving message. Try after sometime');
  }
};

const setChatAsRead = dispatch => async chatId => {
  await api.put(`/external/my-chats/${chatId}/read/R`);
};

export const { Context, Provider } = createDataContext(
  chatReducer,
  {
    clearError,
    fetchChatList,
    newChat,
    closeChat,
    getChatDetail,
    addChatMessage,
    setChatAsRead,
  },
  { fetching: false, chats: [], chatDetails: [], error: '' }
);
