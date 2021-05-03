import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import { Context as AuthContext } from '../contexts/AuthContext';
import ErrorText from '../components/ErrorText';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';

const changePasswordValidationSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const ChangePasswordScreen = ({ route }) => {
  const { state, changePassword } = useContext(AuthContext);
  const { id } = route.params;

  return (
    <KeyboardAwareContainer>
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      >
        <View style={styles.viewContainer}>
          <Spacer>
            <Text style={styles.note}>
              New password should be minimum of 8 characters.
            </Text>
          </Spacer>
          <Formik
            validationSchema={changePasswordValidationSchema}
            validateOnMount={true}
            initialValues={{
              oldPassword: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values =>
              changePassword({
                id,
                oldPassword: values.oldPassword,
                password: values.password,
              })
            }
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={CustomInput}
                  name="oldPassword"
                  placeholder="Old Password"
                  autoFocus={true}
                  secureTextEntry={true}
                  maxLength={20}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry={true}
                  maxLength={20}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <Field
                  component={CustomInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  maxLength={20}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <ErrorText errorMessage={state.errorMessage} />
                <Spacer>
                  <Button
                    onPress={handleSubmit}
                    title="Save Password"
                    disabled={!isValid}
                    loading={state.fetching}
                  />
                </Spacer>
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
    alignItems: 'center',
  },
  note: {
    marginTop: 5,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ChangePasswordScreen;
