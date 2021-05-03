import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Context as ChatContext } from '../contexts/ChatContext';
import ErrorText from '../components/ErrorText';
import { CATEGORIES } from '../helpers/CategoryHelper';
import { useNavigation } from '@react-navigation/native';
import { Entypo, Fontisto } from '@expo/vector-icons';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';
import CustomPicker from '../components/CustomPicker';
import Colors from '../helpers/ColorHelper';
import useDocumentPicker from '../hooks/useDocumentPicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const addChatValidationSchema = yup.object().shape({
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

const AddChatScreen = () => {
  const [document, setDocument, pickDocument] = useDocumentPicker();
  const { state, newChat, clearError } = useContext(ChatContext);
  const navigation = useNavigation();

  const [category, setCategory] = useState('I have a question on my medicines');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearError();
      setDocument(null);
    });
    return unsubscribe;
  }, [navigation, clearError, setDocument]);

  return (
    <KeyboardAwareContainer>
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      >
        <View style={styles.viewContainer}>
          <Formik
            validationSchema={addChatValidationSchema}
            initialValues={{ subject: '', message: '' }}
            validateOnMount={true}
            onSubmit={values =>
              newChat({
                category,
                subject: values.subject,
                message: values.message,
                file: document,
              })
            }
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isValid,
              values,
              errors,
              touched,
            }) => (
              <>
                <CustomPicker
                  items={CATEGORIES}
                  value={category}
                  setValue={setCategory}
                  placeholder={{}}
                />
                <TextInput
                  name="subject"
                  placeholder="What is this about?"
                  style={styles.subjectInput}
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  value={values.subject}
                  autoFocus={true}
                  maxLength={100}
                />
                {errors.subject && touched.subject && (
                  <Text style={styles.errorText}>{errors.subject}</Text>
                )}
                <TextInput
                  name="message"
                  placeholder="Enter Your Query"
                  style={[styles.messageInput]}
                  onChangeText={handleChange('message')}
                  onBlur={handleBlur('message')}
                  value={values.message}
                  multiline={true}
                  maxHeight={120}
                  minHeight={60}
                />
                {errors.message && touched.message && (
                  <Text style={styles.errorText}>{errors.message}</Text>
                )}
                {isValid && document && (
                  <View style={styles.documentContainer}>
                    <Text style={styles.document}>{document.name}</Text>
                  </View>
                )}
                {isValid && (
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={pickDocument}>
                      <Entypo
                        name="attachment"
                        style={styles.fileIcon}
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                    <Fontisto name="camera" size={24} color="white" />
                  </View>
                )}
                <ErrorText errorMessage={state.error} />
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={handleSubmit}
                    title="Send Message"
                    disabled={!isValid}
                    loading={state.saving}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAwareContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  viewContainer: {
    marginTop: 24,
    padding: 24,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  iconContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginVertical: 10,
  },
  subjectInput: {
    marginTop: 15,
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  messageInput: {
    marginTop: 15,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  fileIcon: {
    marginRight: 15,
  },
  errorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.errorTextColor,
    alignSelf: 'flex-start',
  },
  errorInput: {
    borderColor: Colors.errorTextColor,
  },
  buttonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
  },
  documentContainer: {
    marginVertical: 15,
    justifyContent: 'center',
  },
  document: {
    color: Colors.textColor,
  },
});

export default AddChatScreen;
