import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import HeaderTitle from '../components/HeaderTitle';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';
import { Context as AuthContext } from '../contexts/AuthContext';
import ErrorText from '../components/ErrorText';
import { FORGOT_PASSWORD_SCREEN } from '../helpers/ConstantHelper';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { View } from 'react-native';

const validationSchema = yup.object().shape({
  name: yup.string().required('User name is required'),
  password: yup.string().required('Password is required'),
});

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearError } = useContext(AuthContext);

  // Clear error if any
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearError();
    });
    return unsubscribe;
  }, [navigation, clearError]);

  // Disable back button
  useFocusEffect(() => {
    navigation.setOptions({
      headerLeft: null,
    });
  });

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
            <HeaderTitle title="Sign In Your Account" />
          </Spacer>
          <Formik
            validationSchema={validationSchema}
            validateOnMount={true}
            initialValues={{ name: '', password: '' }}
            onSubmit={signin}
          >
            {({ handleSubmit, isValid }) => {
              return (
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
                  <Field
                    component={CustomInput}
                    name="password"
                    placeholder="Password"
                    secureTextEntry={true}
                    maxLength={20}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <ErrorText errorMessage={state.errorMessage} />
                  <Spacer>
                    <Button
                      onPress={handleSubmit}
                      title="Sign In"
                      disabled={!isValid}
                      loading={state.fetching}
                    />
                  </Spacer>
                </>
              );
            }}
          </Formik>
          <NavLink
            text="Can't Remember Your Password?"
            routeName={FORGOT_PASSWORD_SCREEN}
          />
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
});

export default SigninScreen;
