import createDataContext from './createDataContext';
import api from '../helpers/AxiosHelper';
import { getRiskPoint } from '../helpers/TransformHelper';
import { successToast, errorToast } from '../helpers/ToastHelper';
import { goBack } from '../helpers/NavigationHelper';

const DISEASE_LIST_REQUEST = 'DISEASE_LIST_REQUEST';
const DISEASE_LIST_SUCCESS = 'DISEASE_LIST_SUCCESS';
const DISEASE_LIST_ERROR = 'DISEASE_LIST_ERROR';

const QUESTIONNAIRE_LIST_REQUEST = 'QUESTIONNAIRE_LIST_REQUEST';
const QUESTIONNAIRE_LIST_SUCCESS = 'QUESTIONNAIRE_LIST_SUCCESS';
const QUESTIONNAIRE_LIST_ERROR = 'QUESTIONNAIRE_LIST_ERROR';

const SET_QUESTIONNAIRE = 'SET_QUESTIONNAIRE';

const SAVE_QUESTIONNAIRE_REQUEST = 'SAVE_QUESTIONNAIRE_REQUEST';
const SAVE_QUESTIONNAIRE_SUCCESS = 'SAVE_QUESTIONNAIRE_SUCCESS';
const SAVE_QUESTIONNAIRE_ERROR = 'SAVE_QUESTIONNAIRE_ERROR';

const CLEAR_ERROR = 'CLEAR_ERROR';
const CLEAR_QUESTIONNAIRE = 'CLEAR_QUESTIONNAIRE';

const diseaseReducer = (state, action) => {
  switch (action.type) {
    // Disease list
    case DISEASE_LIST_REQUEST:
      return { ...state, fetching: true, diseases: [], error: '' };
    case DISEASE_LIST_SUCCESS:
      return { ...state, fetching: false, diseases: action.payload, error: '' };
    case DISEASE_LIST_ERROR:
      return { ...state, fetching: false, diseases: [], error: action.payload };

    // Questionnaire list
    case QUESTIONNAIRE_LIST_REQUEST:
      return { ...state, fetching: true, questionnaires: [], error: '' };
    case QUESTIONNAIRE_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        questionnaires: action.payload ?? [],
        error: '',
      };
    case QUESTIONNAIRE_LIST_ERROR:
      return {
        ...state,
        fetching: false,
        questionnaires: [],
        error: action.payload,
      };

    // Save Questionnaire
    case SAVE_QUESTIONNAIRE_REQUEST:
      return { ...state, saving: true, error: '' };
    case SAVE_QUESTIONNAIRE_SUCCESS:
      return { ...state, saving: false, error: '' };
    case SAVE_QUESTIONNAIRE_ERROR:
      return { ...state, saving: false, error: action.payload };

    // Set Questionnaire
    case SET_QUESTIONNAIRE:
      const questionnaires = state.questionnaires.map(item =>
        item.id === action.payload.id
          ? {
              ...item,
              answer: action.payload.value,
              riskPoint: getRiskPoint(item, action.payload.value),
            }
          : item
      );
      return { ...state, questionnaires };

    // Clear error
    case CLEAR_QUESTIONNAIRE:
      return { ...state, questionnaires: [] };

    // Clear error
    case CLEAR_ERROR:
      return { ...state, fetching: false, error: '' };
    default:
      return state;
  }
};

const clearQuestionniare = dispatch => () => {
  dispatch({ type: CLEAR_QUESTIONNAIRE });
};

const clearError = dispatch => () => {
  dispatch({ type: CLEAR_ERROR });
};

const fetchDiseaseList = dispatch => async () => {
  try {
    dispatch({ type: DISEASE_LIST_REQUEST });
    const response = await api.get('/external/diseases');
    dispatch({ type: DISEASE_LIST_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({
      type: DISEASE_LIST_ERROR,
      payload: 'Error fetching disease list. Try after sometime.',
    });
  }
};

const fetchQuestionnaireList = dispatch => async abbreviation => {
  try {
    dispatch({ type: QUESTIONNAIRE_LIST_REQUEST });
    const response = await api.get(
      `/external/my-questionnaires/${abbreviation}`
    );
    dispatch({
      type: QUESTIONNAIRE_LIST_SUCCESS,
      payload: response.data?.questions,
    });
  } catch (err) {
    dispatch({
      type: QUESTIONNAIRE_LIST_ERROR,
      payload: 'Error fetching questionnaire list. Try after sometime.',
    });
  }
};

const setQuestionnaire = dispatch => (id, value) => {
  dispatch({ type: SET_QUESTIONNAIRE, payload: { id, value } });
};

const saveQuestionnaires = dispatch => async questionnaires => {
  try {
    dispatch({ type: SAVE_QUESTIONNAIRE_REQUEST });
    const response = await api.put(
      '/external/my-questionnaires',
      questionnaires
    );
    dispatch({ type: SAVE_QUESTIONNAIRE_SUCCESS, payload: response.data });
    goBack();
    successToast('Answers saved successfully.');
  } catch (err) {
    dispatch({
      type: SAVE_QUESTIONNAIRE_ERROR,
      payload: 'Error saving questionnaires. Try after sometime.',
    });
    errorToast('Error saving questionnaires. Try after sometime.');
  }
};

export const { Context, Provider } = createDataContext(
  diseaseReducer,
  {
    clearQuestionniare,
    clearError,
    fetchDiseaseList,
    fetchQuestionnaireList,
    setQuestionnaire,
    saveQuestionnaires,
  },
  { fetching: false, diseases: [], questionnaires: [], error: '' }
);
