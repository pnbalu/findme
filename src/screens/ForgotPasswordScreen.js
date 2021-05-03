import React, { useContext, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import HeaderTitle from '../components/HeaderTitle';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import { NEW_PASSWORD_SCREEN } from '../helpers/ConstantHelper';
import { Context as AuthContext } from '../contexts/AuthContext';
import ErrorText from '../components/ErrorText';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';
import Colors from '../helpers/ColorHelper';

const validationSchema = yup.object().shape({
  name: yup.string().required('User name is required'),
});

const ForgotPasswordScreen = ({ navigation }) => {
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
            <HeaderTitle title="Reset Password" />
            <Text style={styles.note}>
              Enter the user name and we will send an email with token to reset
              your password.
            </Text>
          </Spacer>
          <Formik
            validationSchema={validationSchema}
            validateOnMount={true}
            initialValues={{ name: '' }}
            onSubmit={values => console.log(values)}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={CustomInput}
                  name="name"
                  placeholder="User Name"
                  maxLength={20}
                  autoFocus={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <ErrorText errorMessage={state.errorMessage} />
                <Spacer>
                  <Button
                    onPress={handleSubmit}
                    title="Reset Password"
                    disabled={!isValid}
                    loading={state.fetching}
                  />
                </Spacer>
              </>
            )}
          </Formik>
          <Spacer>
            <NavLink
              text="Have Valid Token? Set Your New Password."
              routeName={NEW_PASSWORD_SCREEN}
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

export default ForgotPasswordScreen;
