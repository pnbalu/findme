import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { navigationRef } from './src/helpers/NavigationHelper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from './src/screens/SigninScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import { APP_NAME } from './src/helpers/ConstantHelper';
import { Provider as AuthProvider } from './src/contexts/AuthContext';
import { Provider as ChatProvider } from './src/contexts/ChatContext';
import { Provider as ReminderProvider } from './src/contexts/ReminderContext';
import { Provider as DiseaseProvider } from './src/contexts/DiseaseContext';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import LandingNavigation from './src/navigations/LandingTabNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import Colors from './src/helpers/ColorHelper';
import Logo from './src/components/Logo';

const theme = {
  Button: {
    raised: true,
    titleStyle: {
      color: Colors.buttonTextColor,
    },
  },
  colors: {
    primary: Colors.themePrimaryColor,
  },
  Text: {
    color: Colors.themeTextColor,
  },
  Avatar: {
    rounded: false,
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ChatProvider>
          <ReminderProvider>
            <DiseaseProvider>
              <ThemeProvider theme={theme}>
                <NavigationContainer ref={navigationRef}>
                  <Stack.Navigator
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: Colors.headerBackgroundColor,
                      },
                      headerTitle: APP_NAME,
                      headerTintColor: Colors.headerTextColor,
                      headerRight: () => <Logo />,
                    }}
                  >
                    <Stack.Screen
                      name="Landing"
                      component={LandingNavigation}
                      options={{ gestureEnabled: false, headerShown: false }}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
                <FlashMessage position="top" />
              </ThemeProvider>
            </DiseaseProvider>
          </ReminderProvider>
        </ChatProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
