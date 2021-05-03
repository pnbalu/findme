import createDataContext from './createDataContext';
import api from '../helpers/AxiosHelper';
import { successToast, errorToast } from '../helpers/ToastHelper';

const REMINDER_LIST_REQUEST = 'REMINDER_LIST_REQUEST';
const REMINDER_LIST_SUCCESS = 'REMINDER_LIST_SUCCESS';
const REMINDER_LIST_ERROR = 'REMINDER_LIST_ERROR';

const SET_REMINDER = 'SET_REMINDER';

const SAVE_REMINDER_REQUEST = 'SAVE_REMINDER_REQUEST';
const SAVE_REMINDER_SUCCESS = 'SAVE_REMINDER_SUCCESS';
const SAVE_REMINDER_ERROR = 'SAVE_REMINDER_ERROR';

const CLEAR_ERROR = 'CLEAR_ERROR';

const reminderReducer = (state, action) => {
  switch (action.type) {
    // Reminder list
    case REMINDER_LIST_REQUEST:
      return { ...state, fetching: true, reminders: [], error: '' };
    case REMINDER_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        reminders: action.payload,
        error: '',
      };
    case REMINDER_LIST_ERROR:
      return {
        ...state,
        fetching: false,
        reminders: [],
        error: action.payload,
      };

    // Save Reminder
    case SAVE_REMINDER_REQUEST:
      return { ...state, saving: true, error: '' };
    case SAVE_REMINDER_SUCCESS:
      return { ...state, saving: false, error: '' };
    case SAVE_REMINDER_ERROR:
      return { ...state, saving: false, error: action.payload };

    // Set Reminder
    case SET_REMINDER:
      const reminders = state.reminders.map(item =>
        item.id === action.payload.id
          ? { ...item, answer: action.payload.value }
          : item
      );
      return { ...state, reminders };

    // Clear error
    case CLEAR_ERROR:
      return { ...state, fetching: false, error: '' };
    default:
      return state;
  }
};

const clearError = dispatch => () => {
  dispatch({ type: CLEAR_ERROR });
};

const fetchReminderList = dispatch => async () => {
  try {
    dispatch({ type: REMINDER_LIST_REQUEST });
    const response = await api.get('/external/my-reminders');
    dispatch({ type: REMINDER_LIST_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({
      type: REMINDER_LIST_ERROR,
      payload: 'Error fetching reminders. Try after sometime.',
    });
  }
};

const setReminder = dispatch => (id, value) => {
  dispatch({
    type: SET_REMINDER,
    payload: { id, value: value ? 'Yes' : 'No' },
  });
};

const saveReminders = dispatch => async reminders => {
  try {
    dispatch({ type: SAVE_REMINDER_REQUEST });
    const response = await api.put('/external/my-reminders', reminders);
    dispatch({ type: SAVE_REMINDER_SUCCESS, payload: response.data });
    successToast('Reminders saved successfully.');
  } catch (err) {
    dispatch({
      type: SAVE_REMINDER_ERROR,
      payload: 'Error saving reminders. Try after sometime.',
    });
    errorToast('Error saving reminders. Try after sometime.');
  }
};

export const { Context, Provider } = createDataContext(
  reminderReducer,
  { clearError, fetchReminderList, setReminder, saveReminders },
  { fetching: false, reminders: [], error: '' }
);
