import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import HeaderTitle from '../components/HeaderTitle';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import { SIGNIN_SCREEN } from '../helpers/ConstantHelper';
import { Context as AuthContext } from '../contexts/AuthContext';
import ErrorText from '../components/ErrorText';
import Colors from '../helpers/ColorHelper';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';

const validationSchema = yup.object().shape({
  token: yup.string().required('Token is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const NewPasswordScreen = ({ navigation }) => {
  const { state, clearError } = useContext(AuthContext);

  // Clear error if any
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearError();
    });
    return unsubscribe;
  }, [navigation, clearError]);

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
            <HeaderTitle title="New Password" />
            <Text style={styles.note}>
              Enter the verification token sent to your registered email along
              with new password.
            </Text>
          </Spacer>
          <Formik
            validationSchema={validationSchema}
            validateOnMount={true}
            initialValues={{ token: '', password: '', confirmPassword: '' }}
            onSubmit={values => console.log(values)}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={CustomInput}
                  name="token"
                  placeholder="Token"
                  maxLength={6}
                  autoFocus={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
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
          <Spacer>
            <NavLink
              text="Have Valid Password? Signin instead."
              routeName={SIGNIN_SCREEN}
            />
          </Spacer>
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
    color: Colors.textColor,
    textAlign: 'center',
  },
});

export default NewPasswordScreen;
