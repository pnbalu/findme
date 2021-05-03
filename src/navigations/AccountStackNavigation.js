import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import Colors from '../helpers/ColorHelper';
import Logo from '../components/Logo';

const AccountStack = createStackNavigator();

const AccountNavigation = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackgroundColor,
        },
        headerTintColor: Colors.headerTextColor,
        headerRight: () => <Logo />,
      }}
    >
      <AccountStack.Screen
        name="AccountDetail"
        component={AccountScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <AccountStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ gestureEnabled: false, title: 'Change My Password' }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountNavigation;
