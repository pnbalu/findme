import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../helpers/ColorHelper';
import DoctorScreen from '../screens/DoctorScreen';
import SpecialityScreen from '../screens/SpecialityScreen';

const DoctorStack = createStackNavigator();

const DoctorNavigation = () => {
  return (
    <DoctorStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackgroundColor,
        },
        headerTintColor: Colors.headerTextColor,
      }}
    >
      <DoctorStack.Screen
        name="MyDoctor"
        component={DoctorScreen}
        options={{ title: 'My Doctors' }}
      />
      <DoctorStack.Screen
        name="SpecialityDoctor"
        component={SpecialityScreen}
      />
    </DoctorStack.Navigator>
  );
};

export default DoctorNavigation;
